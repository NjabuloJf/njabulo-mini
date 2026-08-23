const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");

// Use current directory
const PUBLIC_DIR = __dirname;

console.log('✅ Starting bot...');
console.log('📁 Serving from:', PUBLIC_DIR);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(PUBLIC_DIR));

// Load pair module
try {
    const code = require('./pair');
    if (code) {
        app.use('/code', code);
        console.log('✅ Pair module loaded');
    }
} catch (err) {
    console.error('❌ Pair module error:', err.message);
}

// Serve HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, 'main.html'));
});

app.get('/pair', (req, res) => {
    // If pair.html exists, serve it, otherwise serve main.html
    res.sendFile(path.join(PUBLIC_DIR, 'main.html'));
});

// Health check
app.get('/ping', (req, res) => {
    res.json({ status: 'active', bot: 'njabulomini-bot' });
});

module.exports = app;
