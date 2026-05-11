require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = "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";

app.post('/api/generate', async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: "openrouter/auto", // 100% free model
                messages: [
                    { role: "user", content: prompt }
                ],
                max_tokens: 1024
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'http://localhost',
                    'X-Title': 'Caption Lab'
                }
            }
        );

        const aiResponse = response.data.choices[0].message.content;
        res.json({ result: aiResponse });

    } catch (error) {
        console.error("API Error:", error.response ? JSON.stringify(error.response.data) : error.message);
        res.status(500).json({ error: "Request failed: " + (error.response ? JSON.stringify(error.response.data) : error.message) });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));