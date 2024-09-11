const chatInput = document.querySelector(".chat-input textarea");
const sendChatbtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");

let userMessage;

// https://platform.openai.com/api-keys
const API_KEY = your_api_key;

//add msg from text area
const createChatLi = (message, className) => {
    //creating chat <li> element with passed msg and classname
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = () => {
    // https://platform.openai.com/docs/api-reference/introduction
    const API_URL = "https://api.openai.com/v1/chat/completions"

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
    messages: [
        {role: "user", content: userMessage}
    ]
        })
    }
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;

    //append user's msg to chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    
    setTimeout(() => {
        //display thinking msg while waiting for response
        chatbox.appendChild(createChatLi("Thinking...", "incoming"));
        generateResponse();
    }, 600);
}

sendChatbtn.addEventListener("click", handleChat);
