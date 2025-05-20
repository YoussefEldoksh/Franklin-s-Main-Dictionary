const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = 3000;

// API key from environment variable
const apiKey = process.env.DIC_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Test endpoint
app.get('/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

// Dictionary API endpoint
app.get('/api/dictionary/:word', async (req, res) => {
    try {
        const word = req.params.word;
        console.log('Searching for word:', word);

        const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`;
        console.log('API URL:', url);

        const response = await fetch(url);
        console.log('API Response status:', response.status);

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response data:', data);
        res.json(data);
    } catch (error) {
        console.error('Detailed error:', error);
        res.status(500).json({
            error: 'Failed to fetch dictionary data',
            details: error.message,
            stack: error.stack
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        error: 'Server error',
        details: err.message
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Test the server by visiting: http://localhost:3000/test');
}); 