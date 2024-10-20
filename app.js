// Check if the browser supports the Web Speech API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const output = document.getElementById("output");

// Set up recognition properties
recognition.interimResults = false; // Final results only
recognition.lang = "en-US"; // Set language
recognition.maxAlternatives = 1; // Limit alternatives

// Automatically start listening when the page loads
recognition.start();
output.textContent = "Listening...";

// Listen for results
recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    output.textContent = `You said: ${command}`;
    executeCommand(command);

    // Stop listening after the command is executed
    recognition.stop();

    // Restart listening after a 50ms delay
    setTimeout(() => {
        recognition.start();
    }, 50);
};

// Handle errors
recognition.onerror = (event) => {
    output.textContent = `Error occurred in recognition: ${event.error}`;
    
    // Restart recognition after a 5ms delay in case of error
    setTimeout(() => {
        recognition.start();
    }, 50);
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
        case "close":
            window.close();
            break;
        case "open browser":
            window.open("browser.html"); 
            break;    
        default:
            output.textContent += " - Command not recognized.";
    }
}
