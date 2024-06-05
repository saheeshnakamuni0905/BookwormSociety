const socketIo = require('socket.io');
let io = null;

function setupIo(server) {
    io = socketIo(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected');
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
    return io;
}

function getIo() {
    if (!io) {
        throw new Error("Socket.IO not initialized");
    }
    return io;
}

module.exports = { setupIo, getIo };
