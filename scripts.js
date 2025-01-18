let isAdmin = false; // Admin status flag

// Check if there's saved data in localStorage
window.onload = function() {
    displayMemories();
};

function showPasswordInput() {
    // Hide the login button and show the password input
    document.querySelector('#adminLogin button').style.display = 'none';
    document.getElementById('passwordInputContainer').style.display = 'block';
}

function authenticateAdmin() {
    const passwordInput = document.getElementById('adminPassword').value;
    const correctPassword = "admin0200"; // New password

    if (passwordInput === correctPassword) {
        isAdmin = true;
        alert("Admin authenticated!");
        document.getElementById('adminLogin').style.display = 'none'; // Hide login form
        displayMemories(); // Show memories with delete buttons
    } else {
        alert("Incorrect password. Try again.");
    }
}

function saveMemory() {
    const imageInput = document.getElementById('memoryImage');
    const textInput = document.getElementById('memoryText');
    
    // Create memory object
    const memory = {
        image: imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : null,
        text: textInput.value
    };

    // Save to localStorage
    let memories = JSON.parse(localStorage.getItem('memories')) || [];
    memories.push(memory);
    localStorage.setItem('memories', JSON.stringify(memories));

    // Clear form fields
    imageInput.value = '';
    textInput.value = '';

    // Display updated memories
    displayMemories();
}

function displayMemories() {
    const memoryContainer = document.getElementById('memoryContainer');
    memoryContainer.innerHTML = ''; // Clear current memories

    let memories = JSON.parse(localStorage.getItem('memories')) || [];
    
    memories.forEach((memory, index) => {
        const memoryDiv = document.createElement('div');
        memoryDiv.classList.add('memory');
        
        if (memory.image) {
            const image = document.createElement('img');
            image.src = memory.image;
            memoryDiv.appendChild(image);
        }
        
        const text = document.createElement('p');
        text.textContent = memory.text;
        memoryDiv.appendChild(text);

        // If the user is an admin, show the delete button
        if (isAdmin) {
            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Delete";
            deleteButton.classList.add('delete-btn');
            deleteButton.onclick = function() {
                deleteMemory(index); // Delete the memory by index
            };
            memoryDiv.appendChild(deleteButton);
        }
        
        memoryContainer.appendChild(memoryDiv);
    });
}

function deleteMemory(index) {
    let memories = JSON.parse(localStorage.getItem('memories')) || [];
    memories.splice(index, 1); // Remove the memory at the given index
    localStorage.setItem('memories', JSON.stringify(memories)); // Update localStorage
    displayMemories(); // Refresh the displayed memories
}
