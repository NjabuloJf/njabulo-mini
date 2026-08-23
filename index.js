// api/index.js (Vercel serverless function)
const express = require('express');
const app = express();
const bodyParser = require("body-parser");

// Remove __path and file serving
// Use API routes instead of serving HTML files

// Routes
app.get('/api/pair', async (req, res) => {
    // Return JSON response instead of HTML file
    res.json({ 
        status: 'pair endpoint',
        message: 'This would handle pairing logic' 
    });
});

app.get('/api/ping', (req, res) => {
    res.status(200).json({
        status: 'active',
        platform: 'vercel',
        timestamp: new Date().toISOString()
    });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Export for Vercel
module.exports = app;
