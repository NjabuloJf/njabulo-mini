const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
let code = require('./pair');

// Increase event listeners limit
require('events').EventEmitter.defaultMaxListeners = 500;

// Middleware - Should come BEFORE routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/code', code);
app.use('/pair', async (req, res, next) => {
    res.sendFile(__path + '/pair.html')
});
app.use('/', async (req, res, next) => {
    res.sendFile(__path + '/main.html')
});

// Health check endpoint
app.get('/ping', (req, res) => {
    res.status(200).send({
        status: 'active',
        bot: 'njabulomini-bot',
        uptime: process.uptime(),
        memory: process.memoryUsage()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

// Only start server if not in Vercel environment
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`
╔════════════════════════════════════════╗
║     🤖 njabulomini-bot is alive!      ║
║                                        ║
║     📡 Server running on port: ${PORT}    ║
║     🌐 URL: http://localhost:${PORT}    ║
║     👑 Made by Hans Tech              ║
╚════════════════════════════════════════╝
        `);
    });
}

// Export app for Vercel
module.exports = app;
