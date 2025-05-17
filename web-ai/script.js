// Ensure this script is loaded as type="module" in your HTML
import { GoogleGenerativeAI } from "https://cdn.jsdelivr.net/npm/@google/generative-ai/+esm";

// --- Global Variables ---
let genAI; 
let aiChatInstance; 
let allChats = {}; 
let activeChatId = null;
let attachedImageFile = null; 
let attachedImageBase64 = null; 
let attachedImageMimeType = null; 
let attachedImageThumbnailDataUrl = null; 

// --- DOM Element References ---
let settingsToggleButton, settingsPanel, closeSettingsButton, saveSettingsButton, clearStorageButton; 
let messageInput, sendButton, chatBoxArea, currentChatTitleElement;
let apiKeyInput, themeSelect, modelSelect;
let newChatButton, chatListElement;
let attachImageButton, imageFileInput, imagePreviewArea, selectedImagePreview, removeImageButton, selectedImageNameElement;

document.addEventListener('DOMContentLoaded', () => {
    console.log("===========================================================");
    console.log("****** DOM fully loaded. Initializing Script V_DEBUG_CLEAR_STORAGE ******");
    console.log("===========================================================");

    // Assign DOM Elements
    settingsToggleButton = document.getElementById('settings-toggle-button');
    settingsPanel = document.getElementById('settings-panel');
    closeSettingsButton = document.getElementById('close-settings-button');
    saveSettingsButton = document.getElementById('save-settings-button');
    clearStorageButton = document.getElementById('clear-storage-button'); 

    messageInput = document.getElementById('message-input');
    sendButton = document.getElementById('send-button');
    chatBoxArea = document.getElementById('chat-box-area');
    currentChatTitleElement = document.getElementById('current-chat-title');
    apiKeyInput = document.getElementById('api-key-input');
    themeSelect = document.getElementById('theme-select');
    modelSelect = document.getElementById('model-select');
    newChatButton = document.getElementById('new-chat-button');
    chatListElement = document.getElementById('chat-list');
    
    attachImageButton = document.getElementById('attach-image-button');
    imageFileInput = document.getElementById('image-file-input');
    imagePreviewArea = document.getElementById('image-preview-area');
    selectedImagePreview = document.getElementById('selected-image-preview');
    removeImageButton = document.getElementById('remove-image-button');
    selectedImageNameElement = document.getElementById('selected-image-name');

    // --- Check for Essential HTML Elements ---
    console.log("--- Checking for Essential HTML Elements (including Clear Storage) ---");
    if (!newChatButton) console.error("[ERROR] 'new-chat-button' NOT FOUND."); else console.log("[OK] 'new-chat-button' found.");
    if (!chatListElement) console.error("[ERROR] 'chat-list' NOT FOUND."); else console.log("[OK] 'chat-list' found.");
    if (!attachImageButton) console.error("[ERROR] 'attach-image-button' NOT FOUND."); else console.log("[OK] 'attach-image-button' found.");
    if (!imageFileInput) console.error("[ERROR] 'image-file-input' NOT FOUND."); else console.log("[OK] 'image-file-input' found.");
    if (!clearStorageButton) {
        console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.error("CRITICAL ERROR: 'clear-storage-button' NOT FOUND in HTML. Clear Storage will NOT work.");
        console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    } else {
        console.log("[OK] 'clear-storage-button' found.");
    }
    // Add other checks as needed for other elements


    // --- Event Listeners ---
    if (settingsToggleButton && settingsPanel) {
        settingsToggleButton.addEventListener('click', () => {
            console.log("Settings button clicked to open.");
            settingsPanel.style.display = 'flex';
        });
    }
    if (closeSettingsButton && settingsPanel) {
        closeSettingsButton.addEventListener('click', () => {
            console.log("Settings close button clicked.");
            settingsPanel.style.display = 'none';
        });
    }
    if (settingsPanel) {
        settingsPanel.addEventListener('click', (event) => {
            if (event.target === settingsPanel) { // Click on backdrop
                console.log("Settings panel backdrop clicked.");
                settingsPanel.style.display = 'none';
            }
        });
    }
    if (saveSettingsButton) {
        saveSettingsButton.addEventListener('click', () => {
            console.log("Save settings button clicked.");
            const apiKey = apiKeyInput.value.trim();
            const selectedTheme = themeSelect.value;
            const defaultModelForNewChats = modelSelect.value;

            let apiKeyChanged = false;
            const previousApiKey = localStorage.getItem('geminiChatApiKey');

            if (apiKey && apiKey !== previousApiKey) {
                localStorage.setItem('geminiChatApiKey', apiKey);
                apiKeyChanged = true;
            } else if (!apiKey && previousApiKey) {
                localStorage.removeItem('geminiChatApiKey');
                genAI = null; aiChatInstance = null; 
                apiKeyChanged = true; 
            } else if (apiKey && !previousApiKey) {
                 localStorage.setItem('geminiChatApiKey', apiKey);
                 apiKeyChanged = true;
            }

            localStorage.setItem('geminiChatTheme', selectedTheme);
            document.body.className = `theme-${selectedTheme}`;
            localStorage.setItem('geminiDefaultModel', defaultModelForNewChats);

            if (apiKeyChanged && activeChatId && allChats[activeChatId]) {
                if (apiKey) { 
                    initializeAIChatSession(apiKey, allChats[activeChatId].model, allChats[activeChatId].history);
                } else { 
                     addMessageToChatBox([{text:"API Key cleared. AI is not active for the current chat."}], "system-message", false);
                     aiChatInstance = null; 
                }
            } else if (apiKeyChanged && !activeChatId && apiKey) {
                console.log("API key updated. AI will initialize on next active chat or new chat.");
            }
            
            if (settingsPanel) settingsPanel.style.display = 'none';
            addMessageToChatBox([{text:"Settings saved!"}], "system-message", false);
        });
    }

    // Clear LocalStorage Button Listener
    if (clearStorageButton) {
        clearStorageButton.addEventListener('click', () => {
            console.log(">>>> 'Clear All Chat Data' button CLICKED. Showing confirmation... <<<<");
            // The confirm() dialog IS the "Are you sure" box with Yes (OK) and No (Cancel)
            if (confirm("Are you sure you want to clear ALL chat data and settings (API Key, Theme, Model preference, and all Chats)? This action cannot be undone.")) {
                console.log("User confirmed clearing storage (Clicked OK/Yes).");
                localStorage.removeItem('geminiAllChats');
                localStorage.removeItem('activeGeminiChatId');
                localStorage.removeItem('geminiChatApiKey');
                localStorage.removeItem('geminiChatApiKey_lastInit'); 
                localStorage.removeItem('geminiChatTheme');
                localStorage.removeItem('geminiDefaultModel');
                
                // Reset in-memory state
                allChats = {};
                activeChatId = null;
                genAI = null;
                aiChatInstance = null;
                if(apiKeyInput) apiKeyInput.value = ""; 
                if(themeSelect) themeSelect.value = "light"; // Reset to default
                if(modelSelect && modelSelect.options.length > 0) modelSelect.selectedIndex = 0; // Reset to first model

                console.log("LocalStorage cleared and app state reset.");
                addMessageToChatBox([{text:"All chat data and settings have been cleared. A new chat has been started."}], "system-message", false);
                
                if(chatBoxArea) chatBoxArea.innerHTML = ''; 
                if(currentChatTitleElement) currentChatTitleElement.textContent = "Chat";
                
                loadAllChatsFromLocalStorage(); // Should be empty now
                renderChatList(); // Will render an empty list or be empty
                createNewChat(); // Start a fresh chat to give the user a starting point

                if (settingsPanel) settingsPanel.style.display = 'none'; 
            } else {
                // This block executes if the user clicks "Cancel" or presses Esc on the confirm dialog
                console.log("Clear storage action CANCELLED by user (Clicked Cancel/No or pressed Esc).");
            }
        });
        console.log("[OK] Event listener for 'clear-storage-button' attached.");
    } else {
        console.error("FAILED to attach listener to 'clear-storage-button': ELEMENT NOT FOUND.");
    }


    if (messageInput) {
        messageInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                if (sendButton) sendButton.click();
            }
        });
        messageInput.addEventListener('input', adjustTextareaHeight);
    }
    if (sendButton) {
        sendButton.addEventListener('click', handleSendMessage);
    }

    if (newChatButton) {
        newChatButton.addEventListener('click', createNewChat);
    }
    
    if (attachImageButton && imageFileInput) {
        attachImageButton.addEventListener('click', () => {
            console.log(">>>> 'Attach Image' button CLICKED. Triggering file input. <<<<");
            imageFileInput.click(); 
        });
    }

    if (imageFileInput) {
        imageFileInput.addEventListener('change', (event) => {
            console.log(">>>> File input CHANGED (image selected). <<<<");
            const file = event.target.files[0];
            if (file) {
                console.log("File selected:", file.name, "Type:", file.type, "Size:", file.size);
                if (!file.type.startsWith('image/')) {
                    addMessageToChatBox([{text:"Invalid file type. Please select an image."}], "system-message", false);
                    clearAttachedImage();
                    return;
                }
                const maxSizeMB = 3; 
                if (file.size > maxSizeMB * 1024 * 1024) {
                     addMessageToChatBox([{text:`Image too large. Max API size is ${maxSizeMB}MB.`}], "system-message", false);
                     clearAttachedImage();
                     return;
                }

                attachedImageFile = file; 
                attachedImageMimeType = file.type;
                
                const reader = new FileReader();
                reader.onloadend = () => {
                    const fullDataUrl = reader.result; 
                    attachedImageBase64 = fullDataUrl.split(',')[1]; 
                    
                    const img = new Image();
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        const MAX_THUMB_WIDTH = 200; 
                        const MAX_THUMB_HEIGHT = 200; 
                        let width = img.width;
                        let height = img.height;

                        if (width > height) {
                            if (width > MAX_THUMB_WIDTH) {
                                height *= MAX_THUMB_WIDTH / width;
                                width = MAX_THUMB_WIDTH;
                            }
                        } else {
                            if (height > MAX_THUMB_HEIGHT) {
                                width *= MAX_THUMB_HEIGHT / height;
                                height = MAX_THUMB_HEIGHT;
                            }
                        }
                        canvas.width = width;
                        canvas.height = height;
                        ctx.drawImage(img, 0, 0, width, height);
                        attachedImageThumbnailDataUrl = canvas.toDataURL('image/jpeg', 0.6); 
                        console.log("Thumbnail created for history, size:", attachedImageThumbnailDataUrl.length);

                        if (selectedImagePreview) selectedImagePreview.src = attachedImageThumbnailDataUrl; 
                        if (selectedImageNameElement) selectedImageNameElement.textContent = file.name;
                        if (imagePreviewArea) imagePreviewArea.style.display = 'flex';
                    };
                    img.onerror = () => {
                        console.error("Image could not be loaded for thumbnail generation. Using full image for preview.");
                        attachedImageThumbnailDataUrl = fullDataUrl; 
                        if (selectedImagePreview) selectedImagePreview.src = fullDataUrl;
                        if (selectedImageNameElement) selectedImageNameElement.textContent = file.name;
                        if (imagePreviewArea) imagePreviewArea.style.display = 'flex';
                    };
                    img.src = fullDataUrl; 
                };
                reader.onerror = () => {
                    console.error("Error reading file.");
                    addMessageToChatBox([{text:"Error reading image file."}], "system-message", false);
                    clearAttachedImage();
                };
                reader.readAsDataURL(file); 
            }
            imageFileInput.value = null; 
        });
    }

    if (removeImageButton) {
        removeImageButton.addEventListener('click', clearAttachedImage);
    }


    // --- Functions ---
    function clearAttachedImage() {
        attachedImageFile = null;
        attachedImageBase64 = null; 
        attachedImageMimeType = null;
        attachedImageThumbnailDataUrl = null; 
        if (imagePreviewArea) imagePreviewArea.style.display = 'none';
        if (selectedImagePreview) selectedImagePreview.src = "#";
        if (selectedImageNameElement) selectedImageNameElement.textContent = "";
        if (imageFileInput) imageFileInput.value = null; 
        console.log("Attached image cleared.");
    }
    
    async function handleSendMessage() {
        if (!messageInput) return;
        const messageText = messageInput.value.trim();
        const imageToSendBase64 = attachedImageBase64;
        const imageToSendMimeType = attachedImageMimeType;
        const imageForHistoryDataUrl = attachedImageThumbnailDataUrl || (selectedImagePreview ? selectedImagePreview.src : null); 

        if (messageText === "" && !imageToSendBase64) { 
            console.log("Message and image are empty, not sending.");
            return;
        }
        console.log("handleSendMessage called.");
        
        const messagePartsForDisplay = [];
        if (messageText !== "") {
            messagePartsForDisplay.push({ text: messageText });
        }
        if (imageForHistoryDataUrl && imageForHistoryDataUrl !== "#") { 
            messagePartsForDisplay.push({ displayImageSrc: imageForHistoryDataUrl });
        }
        addMessageToChatBox(messagePartsForDisplay, "user-message");
        
        const partsForApiAndHistory = [];
        if (messageText !== "") {
            partsForApiAndHistory.push({ text: messageText });
        }
        if (imageToSendBase64 && imageToSendMimeType) { 
            partsForApiAndHistory.push({
                inlineData: { 
                    mimeType: imageToSendMimeType,
                    data: imageToSendBase64
                },
                historyImageSrc: imageForHistoryDataUrl 
            });
        }
        
        if (activeChatId && allChats[activeChatId]) {
            allChats[activeChatId].history.push({ role: "user", parts: partsForApiAndHistory });
            saveAllChatsToLocalStorage();
        }

        messageInput.value = "";
        clearAttachedImage(); 
        adjustTextareaHeight();

        if (!aiChatInstance) {
            const apiKey = localStorage.getItem('geminiChatApiKey');
            if (!apiKey) {
                addMessageToChatBox([{text:"Cannot send message: API Key not set."}], "system-message", false);
                return;
            }
            if (!initializeAIChatSession(apiKey, allChats[activeChatId]?.model || currentModel, allChats[activeChatId]?.history || [])) {
                addMessageToChatBox([{text:"AI not ready. Please check API key and model in settings."}], "system-message", false);
                return;
            }
        }
        
        let typingIndicator = null;
        try {
            const apiParts = partsForApiAndHistory.map(p => {
                if (p.text) return { text: p.text };
                if (p.inlineData) return { inlineData: p.inlineData }; 
                return null; 
            }).filter(p => p !== null);

            console.log("Sending to AI. Parts for API:", apiParts.map(p => p.text ? {text: p.text.substring(0,50)+"..."} : {imageMime: p.inlineData?.mimeType}));
            typingIndicator = addMessageToChatBox([{text:"Gemini is thinking..."}], "bot-message system-typing", false);
            
            const result = await aiChatInstance.sendMessage(apiParts);
            const response = await result.response;
            const botText = response.text();

            if (typingIndicator && typingIndicator.parentNode) {
                typingIndicator.parentNode.removeChild(typingIndicator);
            }

            addMessageToChatBox([{text: botText}], "bot-message", true);
            if (activeChatId && allChats[activeChatId]) {
                allChats[activeChatId].history.push({ role: "model", parts: [{ text: botText }] });
                saveAllChatsToLocalStorage();
            }

        } catch (error) {
            console.error("Error sending message to Gemini API:", error);
            if (typingIndicator && typingIndicator.parentNode) {
                typingIndicator.parentNode.removeChild(typingIndicator);
            }
            let errorMessage = "Sorry, an error occurred while talking to the AI.";
            if (error && error.message) { 
                 if (error.message.includes('API key not valid')) { errorMessage = "API key not valid. Please check your API key in Settings."; }
                 else if (error.message.toLowerCase().includes('quota')) { errorMessage = "You have exceeded your API quota."; }
                 else if (error.message.toLowerCase().includes('model') && (error.message.toLowerCase().includes('not found') || error.message.toLowerCase().includes('permission'))) { errorMessage = `The model "${allChats[activeChatId]?.model || currentModel}" might not be available or accessible with your key.`; }
                 else { errorMessage = `Error: ${error.message}`; }
            }
            addMessageToChatBox([{text:errorMessage}], "bot-message", false);
        }
    }

    function addMessageToChatBox(partsArray, type, useMarkdownForText = true) {
        if (!chatBoxArea) { console.error("Chat box area not found"); return null; }
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', ...type.split(' ')); 

        partsArray.forEach(part => {
            if (part.text) {
                const p = document.createElement('p');
                if (useMarkdownForText && type.includes('bot-message') && !type.includes('system-typing') && window.marked) {
                    try { p.innerHTML = marked.parse(part.text); } 
                    catch (e) { console.error("Markdown parsing error:", e); p.textContent = part.text; }
                } else {
                    p.textContent = part.text;
                }
                messageDiv.appendChild(p);
            } else if (part.displayImageSrc || part.historyImageSrc) { 
                const imgSrc = part.displayImageSrc || part.historyImageSrc;
                if (imgSrc && imgSrc !== "#") { 
                    const imgElement = document.createElement('img');
                    imgElement.src = imgSrc; 
                    imgElement.alt = "Attached image";
                    imgElement.classList.add('message-image'); 
                    messageDiv.appendChild(imgElement);
                }
            }
        });
        
        if (messageDiv.hasChildNodes()){ 
            chatBoxArea.appendChild(messageDiv);
            chatBoxArea.scrollTop = chatBoxArea.scrollHeight; 
        }
        return messageDiv; 
    }

    function generateUniqueId() {
        return `chat_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    }

    function createNewChat() {
        console.log(">>>> createNewChat function CALLED (New Chat button was clicked) <<<<");
        const newChatId = generateUniqueId();
        const defaultModel = localStorage.getItem('geminiDefaultModel') || 'gemini-1.5-flash-latest';
        
        const finalChatName = `Chat ${Object.keys(allChats).length + 1} - ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        console.log("Automatically assigned new chat name:", finalChatName);

        const newChat = {
            id: newChatId,
            name: finalChatName,
            history: [],
            model: defaultModel,
            timestamp: Date.now()
        };
        allChats[newChatId] = newChat;
        console.log("New chat object created in allChats:", newChat);
        setActiveChat(newChatId); 
        saveAllChatsToLocalStorage();
        renderChatList(); 
        console.log("New chat process complete. Active chat should be:", newChatId);
    }

    function deleteChat(chatIdToDelete) {
        console.log(`>>>> deleteChat function CALLED for ID: ${chatIdToDelete} <<<<`);
        if (!allChats[chatIdToDelete]) {
            console.warn(`Attempted to delete non-existent chat: ${chatIdToDelete}`);
            return;
        }
        const chatName = allChats[chatIdToDelete].name;
        console.log(`Deleting chat from allChats object: ${chatIdToDelete} (${chatName})`);
        delete allChats[chatIdToDelete]; 

        if (activeChatId === chatIdToDelete) {
            console.log("The active chat was deleted. Determining next active chat...");
            activeChatId = null; 
            localStorage.removeItem('activeGeminiChatId');
            aiChatInstance = null; 
            if(chatBoxArea) chatBoxArea.innerHTML = ''; 
            if(currentChatTitleElement) currentChatTitleElement.textContent = "Chat"; 

            const remainingChats = Object.values(allChats).sort((a, b) => b.timestamp - a.timestamp); 
            if (remainingChats.length > 0) {
                console.log("Setting active chat to the newest remaining chat:", remainingChats[0].id);
                setActiveChat(remainingChats[0].id); 
            } else {
                console.log("No chats remaining. Creating a new default chat.");
                createNewChat(); 
            }
        } else {
            console.log("A non-active chat was deleted. Active chat remains:", activeChatId);
            renderChatList(); 
        }
        saveAllChatsToLocalStorage();
        console.log("Chat deletion process complete. Current activeChatId:", activeChatId);
    }

    function setActiveChat(chatId) {
        console.log(`Setting active chat to: ${chatId}`);
        if (!allChats[chatId]) {
            console.error(`Chat with ID ${chatId} not found. Attempting to recover.`);
            if (Object.keys(allChats).length === 0) {
                console.log("No chats exist. Calling createNewChat for recovery.");
                createNewChat(); 
                return;
            }
            const sortedChats = Object.values(allChats).sort((a, b) => b.timestamp - a.timestamp);
            if (sortedChats.length > 0) {
                console.log("Recovering by setting active to newest chat:", sortedChats[0].id);
                setActiveChat(sortedChats[0].id); 
            } else { 
                console.log("No chats found during recovery. Calling createNewChat.");
                createNewChat();
            }
            return;
        }

        activeChatId = chatId;
        localStorage.setItem('activeGeminiChatId', activeChatId);
        clearAttachedImage(); 

        const chatData = allChats[activeChatId];
        if(currentChatTitleElement) currentChatTitleElement.textContent = chatData.name || "Chat";
        if(chatBoxArea) chatBoxArea.innerHTML = ''; 
        
        chatData.history.forEach(msg => {
            addMessageToChatBox(msg.parts, msg.role === 'user' ? 'user-message' : 'bot-message', msg.role === 'model');
        });

        const apiKey = localStorage.getItem('geminiChatApiKey');
        if (apiKey) {
            initializeAIChatSession(apiKey, chatData.model, chatData.history);
        } else {
            aiChatInstance = null; 
            addMessageToChatBox([{text:"API Key not set. AI features disabled for this chat."}], "system-message", false);
        }
        renderChatList(); 
        if(messageInput) messageInput.focus();
    }

    function initializeAIChatSession(apiKey, modelName, historyArray) {
        if (!apiKey) {
            console.warn("Cannot initialize AI chat session: API key is missing.");
            aiChatInstance = null;
            return false;
        }
        try {
            console.log(`Initializing AI for chat ${activeChatId} with model: ${modelName}`);
            if (!genAI || apiKey !== localStorage.getItem('geminiChatApiKey_lastInit')) {
                genAI = new GoogleGenerativeAI(apiKey);
                localStorage.setItem('geminiChatApiKey_lastInit', apiKey); 
            }
            const model = genAI.getGenerativeModel({ model: modelName });
            
            const formattedHistory = historyArray.map(h => {
                const sdkParts = h.parts.map(part => {
                    if (part.text) return { text: part.text };
                    if (part.inlineData) return { inlineData: part.inlineData }; 
                    return null; 
                }).filter(p => p); 
                return { role: h.role, parts: sdkParts.length > 0 ? sdkParts : [{text: ""}] }; 
            });

            aiChatInstance = model.startChat({
                history: formattedHistory.filter(h => h.parts.length > 0) 
            });
            console.log("AI Chat session initialized successfully for " + activeChatId);
            return true;
        } catch (error) {
            console.error("Error initializing GoogleGenerativeAI or starting chat:", error);
            addMessageToChatBox([{text:`Error initializing AI: ${error.message}. Check API key and model.`}], "system-message", false);
            aiChatInstance = null;
            return false;
        }
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
    
    function renderChatList() {
        if (!chatListElement) {
            console.error("Cannot render chat list: chatListElement is null.");
            return;
        }
        chatListElement.innerHTML = ''; 
        const sortedChats = Object.values(allChats).sort((a, b) => b.timestamp - a.timestamp); 

        sortedChats.forEach(chatData => {
            const listItem = document.createElement('li');
            listItem.dataset.chatId = chatData.id;

            const chatNameSpan = document.createElement('span');
            chatNameSpan.classList.add('chat-name');
            chatNameSpan.textContent = chatData.name;
            
            listItem.addEventListener('click', (event) => {
                if (event.target.classList.contains('delete-chat-btn')) {
                    return; 
                }
                console.log(`Chat list item (name part) clicked: ${chatData.id}`);
                setActiveChat(chatData.id);
            });

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-chat-btn');
            deleteButton.textContent = '🗑️'; 
            deleteButton.title = `Delete "${chatData.name}"`; 
            
            deleteButton.addEventListener('click', (event) => {
                console.log(`>>>> Delete button (🗑️) CLICKED for chat ID: ${chatData.id}, Name: "${chatData.name}" <<<<`);
                event.stopPropagation(); 
                deleteChat(chatData.id);
            });

            listItem.appendChild(chatNameSpan);
            listItem.appendChild(deleteButton);

            if (chatData.id === activeChatId) {
                listItem.classList.add('active-chat');
            }
            chatListElement.appendChild(listItem);
        });
        console.log("Chat list rendered.");
    }

    function saveAllChatsToLocalStorage() {
        try {
            const chatsToSave = JSON.parse(JSON.stringify(allChats)); 
            for (const chatId in chatsToSave) {
                chatsToSave[chatId].history.forEach(msg => {
                    msg.parts = msg.parts.map(part => {
                        if (part.inlineData) { 
                            return { historyImageSrc: part.historyImageSrc }; 
                        }
                        return part; 
                    });
                });
            }
            localStorage.setItem('geminiAllChats', JSON.stringify(chatsToSave));
            console.log("All chats (with pruned image data for history) saved to localStorage.");
        } catch (e) {
            console.error("Error saving chats to localStorage:", e);
            addMessageToChatBox([{text:"Error saving chats. LocalStorage might be full."}], "system-message", false);
        }
    }

    function loadAllChatsFromLocalStorage() {
        const savedChats = localStorage.getItem('geminiAllChats');
        if (savedChats) {
            try {
                allChats = JSON.parse(savedChats);
            } catch(e) {
                console.error("Error parsing chats from localStorage:", e);
                allChats = {}; 
            }
            console.log("Loaded chats from localStorage:", allChats);
        } else {
            allChats = {}; 
        }
    }

    function initializeApp() {
        console.log("initializeApp (Multi-Chat with Image Thumbnailing & Clear Storage) function called.");
        loadAllChatsFromLocalStorage();

        const savedTheme = localStorage.getItem('geminiChatTheme') || 'light';
        document.body.className = `theme-${savedTheme}`;
        if (themeSelect) themeSelect.value = savedTheme;

        const savedDefaultModel = localStorage.getItem('geminiDefaultModel') || 'gemini-1.5-flash-latest';
        if (modelSelect) modelSelect.value = savedDefaultModel;
        
        const savedApiKey = localStorage.getItem('geminiChatApiKey');
        if (apiKeyInput && savedApiKey) apiKeyInput.value = savedApiKey;

        activeChatId = localStorage.getItem('activeGeminiChatId');
        if (activeChatId && allChats[activeChatId]) {
            setActiveChat(activeChatId);
        } else if (Object.keys(allChats).length > 0) {
            const sortedChats = Object.values(allChats).sort((a, b) => b.timestamp - a.timestamp);
            setActiveChat(sortedChats[0].id);
        } else {
            createNewChat(); 
        }
        
        if (!savedApiKey && Object.keys(allChats).length <= 1 && (allChats[activeChatId] && allChats[activeChatId].history.length === 0)) {
            setTimeout(() => {
                const existingWelcome = chatBoxArea ? chatBoxArea.querySelector('.system-message p[data-welcome-message="true"]') : null;
                if (!existingWelcome) { 
                    const welcomeMsgElement = addMessageToChatBox([{text:"Welcome! Please configure your Gemini API Key in the settings to start chatting."}], "system-message", false);
                    if (welcomeMsgElement && welcomeMsgElement.firstChild) welcomeMsgElement.firstChild.dataset.welcomeMessage = "true";
                }
                if (settingsPanel) settingsPanel.style.display = 'flex';
            }, 500);
        }

        renderChatList(); 
        adjustTextareaHeight();
        console.log("Chatbot Multi-Chat App Initialized with Image Thumbnailing, Delete, and Clear Storage functionality.");
        console.log("===========================================================");
    }

    initializeApp();
});
