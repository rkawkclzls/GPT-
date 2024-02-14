// Function to handle player's door selection
function chooseDoor(doorNumber) {
    const context = getCurrentContext(); // Assume this function retrieves the current game context
    const prompt = `Dungeon Master: Guide the player through door ${doorNumber}. ${context}`;
    sendPromptToGPT(prompt);
}

// Function to send prompts to GPT and handle responses
async function sendPromptToGPT(prompt) {
    const data = { prompt: prompt, max_tokens: 150, temperature: 0.7 };
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const content = await response.json();
        displayEvent(content.choices[0].text); // Display GPT's narrative response
    } catch (error) {
        console.error("Failed to fetch from GPT: ", error);
        displayEvent("The Dungeon Master is lost in thought... Please try again.");
    }
}

// Utility functions like displayEvent() would be similar to those provided in the code,
// dynamically updating the chat interface with responses from GPT.
