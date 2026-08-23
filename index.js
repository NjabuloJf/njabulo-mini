const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");

// Define paths properly
const __dirname = path.resolve();
const PUBLIC_PATH = path.join(__dirname, 'public');

// Increase event listeners limit
require('events').EventEmitter.defaultMaxListeners = 500;

// Middleware - MUST come BEFORE routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(PUBLIC_PATH));

// Routes
try {
    let code = require('./pair');
    app.use('/code', code);
} catch (err) {
    console.error('Failed to load pair module:', err);
}

// Serve HTML files
app.get('/pair', (req, res) => {
    res.sendFile(path.join(PUBLIC_PATH, 'pair.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(PUBLIC_PATH, 'main.html'));
});

// Health check
app.get('/ping', (req, res) => {
    res.status(200).json({
        status: 'active',
        bot: 'njabulomini-bot',
        uptime: process.uptime(),
        memory: process.memoryUsage()
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: err.message 
    });
});

// Export for Vercel
module.exports = app;
