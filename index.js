import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const port = 5001;
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

const users = {};

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join_chat', (username) => {
        users[socket.id] = username;
        io.emit('users_added', Object.values(users));
        io.emit('user_joined', username);
    });

    socket.on('send_message', (message) => {
        io.emit('receive_message', message);
    });

    socket.on('disconnect', () => {
        io.emit('user_left', users[socket.id]);
        delete users[socket.id];
        io.emit('users_added', Object.values(users));
        console.log('User disconnected:', socket.id);
    });
});

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
