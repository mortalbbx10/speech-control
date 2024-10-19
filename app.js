// Check if the browser supports the Web Speech API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const output = document.getElementById("output");

// Set up recognition properties
recognition.interimResults = false; // Final results only
recognition.lang = "en-US"; // Set language
recognition.maxAlternatives = 1; // Limit alternatives

// Start listening when the page loads
startListening();

// Function to start recognition
function startListening() {
    recognition.start();
    output.textContent = "Listening...";
}

// Listen for results
recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    output.textContent = `You said: ${command}`;
    executeCommand(command);
};

// Handle errors
recognition.onerror = (event) => {
    output.textContent = `Error occurred in recognition: ${event.error}`;
    // Restart recognition on error
    startListening();
};

// Function to execute commands
function executeCommand(command) {
    switch (command) {
        case "open notepad":
            window.open("notepad.html"); // Assuming you have a notepad.html page
            break;
        case "open calculator":
            window.open("calculator.html"); // Assuming you have a calculator.html page
            break;
        case "stop":
            output.textContent = "Stopped listening.";
            recognition.stop(); // Stop recognition
            break;
        case "close":
            window.close();
            break;
        default:
            output.textContent += " - Command not recognized.";
    }

    // Continue listening after executing a command unless "stop" was said
    if (command !== "stop") {
        startListening(); // Keep listening for the next command
    }
}

// Restart listening when recognition ends
recognition.onend = () => {
    if (output.textContent !== "Stopped listening.") {
        startListening();
    }
};
