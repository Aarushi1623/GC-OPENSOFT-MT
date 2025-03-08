require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS

const NEWS_API_KEY = process.env.NEWS_API_KEY; // Load API Key

// API Endpoint to fetch news
app.get('/news', async (req, res) => {
    try {
        const category = req.query.category || "general"; // Default category: general
        const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
            params: {
                country: "us",
                category: category,
                apiKey: NEWS_API_KEY
            }
        });
        res.json(response.data); // Send response to frontend
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ error: "Failed to fetch news" });
    }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
