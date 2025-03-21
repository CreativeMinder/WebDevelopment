// script.js
const chatHistory = document.getElementById('chat-history');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');

const socket = new WebSocket('ws://localhost:5000');

// Load chat history from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedMessages = JSON.parse(localStorage.getItem('chatHistory')) || [];
    savedMessages.forEach(message => {
        displayMessage(message.text, message.type);
    });
});

// Handle incoming messages
socket.addEventListener('message', function(event) {
    let message;

    // Check if the message is a Blob (binary data)
    if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = function() {
            message = reader.result;
            displayMessage(message, 'received');
            saveMessage(message, 'received');
        };
        reader.readAsText(event.data);
    } else {
        message = event.data;
        displayMessage(message, 'received');
        saveMessage(message, 'received');
    }
});

function displayMessage(message, className) {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageElement.classList.add(className);
    chatHistory.appendChild(messageElement);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function saveMessage(message, type) {
    const chatHistoryArray = JSON.parse(localStorage.getItem('chatHistory')) || [];
    chatHistoryArray.push({ text: message, type: type });
    localStorage.setItem('chatHistory', JSON.stringify(chatHistoryArray));
}

// Handle form submission
chatForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const message = messageInput.value.trim();
    if (message) {
        socket.send(message); // Send text message

        displayMessage(message, 'sent');
        saveMessage(message, 'sent');
        messageInput.value = '';
        messageInput.focus();
    }
});
