const API_KEY = "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";

const generateBtn = document.getElementById('generateBtn');
const clearBtn = document.getElementById('clearBtn');
const userInput = document.getElementById('userInput');
const toneSelector = document.getElementById('toneSelector');
const responseText = document.getElementById('responseText');
const resultBox = document.getElementById('resultBox');
const loadingIndicator = document.getElementById('loadingIndicator');
const copyBtn = document.getElementById('copyBtn');
const themeToggle = document.getElementById('themeToggle');

generateBtn.onclick = async () => {
    const text = userInput.value.trim();
    if (!text) return alert("Drop an idea first!");

    generateBtn.disabled = true;
    loadingIndicator.classList.remove('hidden');
    resultBox.classList.add('hidden');

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost",
                "X-Title": "Caption Lab"
            },
            body: JSON.stringify({
                model: "openrouter/auto",
                messages: [
                    {
                        role: "user",
                        content: `As a social media expert, write a ${toneSelector.value} caption with emojis and hashtags for: ${text}`
                    }
                ],
                max_tokens: 1024
            })
        });

        const data = await response.json();

        if (data.error) throw new Error(JSON.stringify(data.error));

        const aiResponse = data.choices[0].message.content;
        responseText.innerText = aiResponse;
        resultBox.classList.remove('hidden');

    } catch (e) {
        alert("Error: " + e.message);
    } finally {
        generateBtn.disabled = false;
        loadingIndicator.classList.add('hidden');
    }
};

clearBtn.onclick = () => {
    userInput.value = '';
    resultBox.classList.add('hidden');
    responseText.innerText = '';
};

copyBtn.onclick = () => {
    const caption = responseText.innerText;
    if (!caption) return;
    navigator.clipboard.writeText(caption).then(() => {
        copyBtn.textContent = "Copied! ✅";
        setTimeout(() => copyBtn.textContent = "Copy to Clipboard", 2000);
    });
};

themeToggle.onclick = () => {
    document.body.classList.toggle('light-mode');
    themeToggle.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
};