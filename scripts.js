// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAIW2y0DZUzAN1VTooH1RTPJi1NQfFuwFY",
    authDomain: "nantucket-ai.firebaseapp.com",
    databaseURL: "https://nantucket-ai-default-rtdb.firebaseio.com",
    projectId: "nantucket-ai",
    storageBucket: "nantucket-ai.appspot.com",
    messagingSenderId: "848937543590",
    appId: "1:848937543590:web:3e2dee5ab4afef33ab1167",
    measurementId: "G-BZZEFSV6ML",
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Get elements
const exploreMenuBtn = document.getElementById('exploreMenuBtn');
const chatModal = document.getElementById('chatModal');
const closeModal = document.getElementById('closeModal');
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Show modal and send initial message
exploreMenuBtn.addEventListener('click', () => {
    chatModal.style.display = "block";
    sendMessageToBot("Explore the menu");
});

// Close modal
closeModal.addEventListener('click', () => {
    chatModal.style.display = "none";
});

// Send user message
sendBtn.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message !== "") {
        displayMessage("You", message);
        sendMessageToBot(message);
        userInput.value = "";
    }
});

// Display message in chatbox
function displayMessage(sender, message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = `${sender}: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Simulate sending message to bot
function sendMessageToBot(message) {
    // Simulate bot response with a delay
    setTimeout(() => {
        const botResponse = `Bot: You sent "${message}"`;
        displayMessage("Bot", botResponse);
        saveMessageToDatabase(message, botResponse);
    }, 1000);
}

// Save conversation to Firebase
function saveMessageToDatabase(userMessage, botResponse) {
    const chatRef = database.ref('chats').push();
    chatRef.set({
        userMessage: userMessage,
        botResponse: botResponse,
        timestamp: Date.now()
    });
}
