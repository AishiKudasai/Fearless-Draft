const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

// Serve the entire Fearless Draft folder
app.use(express.static(__dirname));

// Latest authoritative draft state
let latestDraftState = null;

io.on('connection', (socket) => {
    console.log(`[Socket.IO] Client connected: ${socket.id}`);

    // Immediately send the latest state to a newly connected client.
    if (latestDraftState) {
        socket.emit('draftState', latestDraftState);
        console.log(`[Socket.IO] Sent current draft to ${socket.id}`);
    }

    socket.on('updateDraft', (state) => {
        latestDraftState = state;

        console.log(
            `[Socket.IO] Draft update from ${socket.id}`
        );

        // Send the authoritative state to every connected client.
        io.emit('draftState', latestDraftState);
    });

    socket.on('disconnect', () => {
        console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
    });
});

// IMPORTANT:
// 0.0.0.0 allows other devices on your LAN/Wi-Fi to connect.
server.listen(PORT, '0.0.0.0', () => {
    console.log('');
    console.log('==============================================');
    console.log(' MLBB FEARLESS DRAFT SERVER');
    console.log('==============================================');
    console.log(` Local:   http://localhost:${PORT}`);
    console.log(` LAN:     http://<LAPTOP-IP>:${PORT}`);
    console.log('==============================================');
    console.log('');
});
