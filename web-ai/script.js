// Ensure this script is loaded as type="module" in your HTML
import { GoogleGenerativeAI } from "https://cdn.jsdelivr.net/npm/@google/generative-ai/+esm";

document.addEventListener('DOMContentLoaded', () => {
    console.log("***********************************************************");
    console.log("****** DOM fully loaded. Initializing script... ******");
    console.log("***********************************************************");

    // --- DOM Element References ---
    const settingsToggleButton = document.getElementById('settings-toggle-button');
    const settingsPanel = document.getElementById('settings-panel');
    const closeSettingsButton = document.getElementById('close-settings-button');
    const saveSettingsButton = document.getElementById('save-settings-button');

    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatBoxArea = document.getElementById('chat-box-area');

    const apiKeyInput = document.getElementById('api-key-input');
    const themeSelect = document.getElementById('theme-select');
    const modelSelect = document.getElementById('model-select');

    // --- Check if essential elements were found ---
    if (!settingsToggleButton) console.error("[ERROR] Element with ID 'settings-toggle-button' NOT FOUND.");
    if (!settingsPanel) console.error("[ERROR] Element with ID 'settings-panel' NOT FOUND.");
    if (!closeSettingsButton) console.error("[ERROR] Element with ID 'close-settings-button' NOT FOUND.");
    if (!saveSettingsButton) console.error("[ERROR] Element with ID 'save-settings-button' NOT FOUND.");
    if (!messageInput) console.error("[ERROR] Element with ID 'message-input' NOT FOUND.");
    if (!sendButton) console.error("[ERROR] Element with ID 'send-button' NOT FOUND.");
    if (!chatBoxArea) console.error("[ERROR] Element with ID 'chat-box-area' NOT FOUND.");
    if (!apiKeyInput) console.error("[ERROR] Element with ID 'api-key-input' NOT FOUND.");
    if (!themeSelect) console.error("[ERROR] Element with ID 'theme-select' NOT FOUND.");
    if (!modelSelect) console.error("[ERROR] Element with ID 'model-select' NOT FOUND.");


    // --- Global Variables for API interaction ---
    let genAI;
    let chat;
    let currentModel = 'gemini-1.5-flash-latest'; // Default model
    let conversationHistory = {}; // Store history per model: { "modelName": [{role, parts}, ...], ... }

    // --- Event Listeners ---
    console.log("Attempting to attach event listeners...");

    // Toggle Settings Panel
    if (settingsToggleButton && settingsPanel) {
        settingsToggleButton.addEventListener('click', () => {
            console.log(">>>> Settings toggle button CLICKED <<<<");
            settingsPanel.style.display = 'flex';
        });
        console.log("[OK] Event listener for settingsToggleButton attached.");
    }

    if (closeSettingsButton && settingsPanel) {
        closeSettingsButton.addEventListener('click', () => {
            console.log(">>>> Close settings button CLICKED <<<<");
            settingsPanel.style.display = 'none';
        });
        console.log("[OK] Event listener for closeSettingsButton attached.");
    }

    if (settingsPanel) {
        settingsPanel.addEventListener('click', (event) => {
            if (event.target === settingsPanel) {
                console.log(">>>> Clicked on settingsPanel backdrop (outside modal content) <<<<");
                settingsPanel.style.display = 'none';
            }
        });
        console.log("[OK] Event listener for settingsPanel (backdrop click) attached.");
    }


    // Message Input: Enter to send, Shift+Enter for new line
    if (messageInput) {
        messageInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                console.log(">>>> ENTER pressed (no Shift). Attempting to send message. <<<<");
                if (sendButton) sendButton.click();
                else handleSendMessage(); // Fallback if button somehow not found by click simulation
            } else if (event.key === 'Enter' && event.shiftKey) {
                console.log(">>>> SHIFT+ENTER pressed. Allowing new line. <<<<");
            }
        });
        messageInput.addEventListener('input', adjustTextareaHeight);
        console.log("[OK] Event listeners for messageInput (keydown, input) attached.");
    }

    // Send Button Click
    if (sendButton) {
        sendButton.addEventListener('click', () => {
            console.log(">>>> Send button CLICKED <<<<");
            handleSendMessage();
        });
        console.log("[OK] Event listener for sendButton (click) attached.");
    }

    // Save Settings Button
    if (saveSettingsButton) {
        saveSettingsButton.addEventListener('click', () => {
            console.log(">>>> Save settings button CLICKED <<<<");
            const apiKey = apiKeyInput ? apiKeyInput.value.trim() : '';
            const selectedTheme = themeSelect ? themeSelect.value : 'light';
            const newSelectedModel = modelSelect ? modelSelect.value : 'gemini-1.5-flash-latest';

            let reinitializeAI = false;
            const previousApiKey = localStorage.getItem('geminiChatApiKey');

            if (apiKey && apiKey !== previousApiKey) {
                localStorage.setItem('geminiChatApiKey', apiKey);
                console.log('API Key saved/updated:', apiKey);
                reinitializeAI = true;
            } else if (!apiKey && previousApiKey) { // API key was removed
                localStorage.removeItem('geminiChatApiKey');
                console.log('API Key cleared.');
                genAI = null; 
                chat = null;  
                reinitializeAI = false; 
            } else if (apiKey && !previousApiKey) { // API key was newly added
                 localStorage.setItem('geminiChatApiKey', apiKey);
                 console.log('API Key saved (new):', apiKey);
                 reinitializeAI = true;
            }


            if (newSelectedModel !== currentModel) {
                currentModel = newSelectedModel; // Update global currentModel
                localStorage.setItem('geminiChatModel', currentModel);
                console.log(`Model preference changed to: ${currentModel}`);
                // If AI was already initialized, we need to reinitialize for the new model
                if (genAI || (apiKey && apiKey === previousApiKey)) { // Reinit if AI exists OR if API key is same but model changed
                   reinitializeAI = true;
                }
            }


            if (reinitializeAI && apiKey) {
                initializeChatSession(apiKey, currentModel);
            } else if (!apiKey) {
                addMessageToChatBox("API Key cleared. AI is not active.", "system-message", false);
            }


            localStorage.setItem('geminiChatTheme', selectedTheme);
            document.body.className = `theme-${selectedTheme}`;
            console.log(`Theme set to: ${selectedTheme}`);

            if (settingsPanel) settingsPanel.style.display = 'none';
            addMessageToChatBox("Settings saved!", "system-message", false);
        });
        console.log("[OK] Event listener for saveSettingsButton attached.");
    }

    // --- Functions ---

    function initializeChatSession(apiKey, modelName) {
        if (!apiKey) {
            console.warn("Cannot initialize chat session: API key is missing.");
            addMessageToChatBox("API Key is missing. Please set it in settings.", "system-message", false);
            genAI = null;
            chat = null;
            return false;
        }
        try {
            console.log(`Initializing AI with model: ${modelName} and API key: ${apiKey ? '******' : 'NOT PROVIDED'}`);
            genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: modelName });
            
            // Load or initialize history for the current model
            if (!conversationHistory[modelName]) {
                conversationHistory[modelName] = [];
            }
            const historyForModel = conversationHistory[modelName];
            
            chat = model.startChat({
                history: historyForModel,
                // generationConfig: { maxOutputTokens: 200 } // Optional
            });
            console.log("Chat session initialized successfully with history:", historyForModel);
            currentModel = modelName; // Ensure global currentModel is updated
            addMessageToChatBox(`AI initialized with model: ${modelName}. Ready to chat!`, "system-message", false);
            return true;
        } catch (error) {
            console.error("Error initializing GoogleGenerativeAI or starting chat:", error);
            addMessageToChatBox(`Error initializing AI: ${error.message}. Check API key and model.`, "system-message", false);
            genAI = null;
            chat = null;
            return false;
        }
    }


    async function handleSendMessage() {
        if (!messageInput) {
            console.error("Cannot send message, messageInput is not found.");
            return;
        }
        const messageText = messageInput.value.trim();
        if (messageText === "") return;

        console.log("handleSendMessage called. Message:", messageText);
        addMessageToChatBox(messageText, "user-message", false); // User messages are not markdown by default
        messageInput.value = "";
        adjustTextareaHeight();

        if (!chat) {
            console.warn("Chat session not initialized. Attempting to initialize...");
            const apiKey = localStorage.getItem('geminiChatApiKey');
            // currentModel should be up-to-date from localStorage or default
            if (!initializeChatSession(apiKey, currentModel)) {
                addMessageToChatBox("AI not ready. Please check API key and model in settings.", "system-message", false);
                return;
            }
        }

        // Add user message to current model's history
        if (!conversationHistory[currentModel]) { // Should have been initialized by initializeChatSession
            conversationHistory[currentModel] = [];
        }
        conversationHistory[currentModel].push({ role: "user", parts: [{ text: messageText }] });

        let typingIndicator = null;
        try {
            console.log("Sending message to AI:", messageText);
            typingIndicator = addMessageToChatBox("Gemini is thinking...", "bot-message system-typing", false); 

            const result = await chat.sendMessage(messageText);
            const response = await result.response;
            const botText = response.text();

            if (typingIndicator && typingIndicator.parentNode) { 
                typingIndicator.parentNode.removeChild(typingIndicator);
            }

            console.log("AI Response:", botText);
            addMessageToChatBox(botText, "bot-message", true); // True for markdown

            conversationHistory[currentModel].push({ role: "model", parts: [{ text: botText }] });
            // localStorage.setItem('geminiConversationHistory', JSON.stringify(conversationHistory)); // Optional: Persist full history

        } catch (error) {
            console.error("Error sending message to Gemini API:", error);
            if (typingIndicator && typingIndicator.parentNode) {
                typingIndicator.parentNode.removeChild(typingIndicator);
            }
            let errorMessage = "Sorry, an error occurred while talking to the AI.";
            if (error && error.message) { // Check if error and error.message exist
                 if (error.message.includes('API key not valid')) {
                    errorMessage = "API key not valid. Please check your API key in Settings.";
                } else if (error.message.toLowerCase().includes('quota')) {
                    errorMessage = "You have exceeded your API quota. Please check your Google Cloud console.";
                } else if (error.message.toLowerCase().includes('model') && (error.message.toLowerCase().includes('not found') || error.message.toLowerCase().includes('permission'))) {
                    errorMessage = `The model "${currentModel}" might not be available or accessible with your key. Try another model or check permissions.`;
                } else {
                     errorMessage = `Error: ${error.message}`;
                }
            }
            addMessageToChatBox(errorMessage, "bot-message", false);
        }
    }

    function addMessageToChatBox(text, type, useMarkdown = true) {
        if (!chatBoxArea) {
            console.error("Chat box area not found to append message:", text);
            return null;
        }
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', ...type.split(' ')); 

        const p = document.createElement('p');
        if (useMarkdown && type.includes('bot-message') && !type.includes('system-typing') && window.marked) {
            try {
                p.innerHTML = marked.parse(text);
            } catch (e) {
                console.error("Markdown parsing error:", e);
                p.textContent = text;
            }
        } else {
            p.textContent = text;
        }
        
        messageDiv.appendChild(p);
        chatBoxArea.appendChild(messageDiv);
        chatBoxArea.scrollTop = chatBoxArea.scrollHeight;
        return messageDiv; 
    }

    function adjustTextareaHeight() {
        if (!messageInput) return;
        messageInput.style.height = 'auto';
        let scrollHeight = messageInput.scrollHeight;
        const computedStyle = getComputedStyle(messageInput);
        const maxHeight = parseInt(computedStyle.maxHeight) || 100;

        if (scrollHeight > maxHeight) {
            messageInput.style.height = maxHeight + 'px';
            messageInput.style.overflowY = 'auto';
        } else {
            messageInput.style.height = scrollHeight + 'px';
            messageInput.style.overflowY = 'hidden';
        }
    }

    // --- Initial Setup on Page Load ---
    function initializeApp() {
        console.log("initializeApp function called.");
        
        // Load conversation history from localStorage (optional)
        // const savedHistory = localStorage.getItem('geminiConversationHistory');
        // if (savedHistory) {
        //     try {
        //         conversationHistory = JSON.parse(savedHistory);
        //     } catch (e) {
        //         console.error("Error parsing saved conversation history:", e);
        //         conversationHistory = {};
        //     }
        // }


        const savedTheme = localStorage.getItem('geminiChatTheme') || 'light';
        document.body.className = `theme-${savedTheme}`;
        if (themeSelect) themeSelect.value = savedTheme;
        else console.warn("Theme select element not found during init.");

        const savedApiKey = localStorage.getItem('geminiChatApiKey');
        currentModel = localStorage.getItem('geminiChatModel') || 'gemini-1.5-flash-latest'; 
        if (modelSelect) modelSelect.value = currentModel;
        else console.warn("Model select element not found during init, cannot set its value.");


        if (savedApiKey && apiKeyInput) {
            apiKeyInput.value = savedApiKey;
            initializeChatSession(savedApiKey, currentModel); 
        } else if (!savedApiKey && apiKeyInput) { 
            setTimeout(() => {
                // Check if the initial welcome message has already been shown to avoid duplicates
                const existingMessages = chatBoxArea.querySelectorAll('.system-message p');
                let alreadyShown = false;
                existingMessages.forEach(msg => {
                    if (msg.textContent.includes("Welcome! Please configure your Gemini API Key")) {
                        alreadyShown = true;
                    }
                });
                if (!alreadyShown) {
                    addMessageToChatBox("Welcome! Please configure your Gemini API Key in the settings to start chatting.", "system-message", false);
                }
                if (settingsPanel) settingsPanel.style.display = 'flex';
                else console.warn("Settings panel not found for initial API key prompt.");
            }, 500);
        } else if (!apiKeyInput) {
            console.warn("API key input element not found during init.");
        }

        adjustTextareaHeight();
        console.log("Chatbot App Initialized. Current theme:", savedTheme, "Current Model:", currentModel);
        console.log("***********************************************************");
    }

    initializeApp();
});
