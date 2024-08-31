// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const cors = require('cors');

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: "https://frontend-pi-ten-31.vercel.app/", // React app URL
//         methods: ["GET", "POST"],
//     },
// });



// app.use(cors());

// io.on('connection', (socket) => {
//     console.log('a user connected');

//     socket.on('join_room', (roomId) => {
//         socket.join(roomId);
//         console.log(`User joined room: ${roomId}`);
//     });

//     socket.on('send_message', ({ roomId, message, senderId }) => {
//         // Emit the message with senderId to the specified room
//         io.to(roomId).emit('receive_message', { message, senderId });
//     });

//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });

// server.listen(4000, () => {
//     console.log('Server is running on port 4000');
// });

// app.get("/",(req, res) =>{
//     res.send("api runing")
// })

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const frontendURL = "https://frontend-pi-ten-31.vercel.app";

const io = new Server(server, {
    cors: {
        origin: frontendURL,
        methods: ["GET", "POST"],
    },
});

app.use(cors({
    origin: frontendURL,
    methods: ["GET", "POST"],
}));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join_room', (roomId) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
    });

    socket.on('send_message', ({ roomId, message, senderId }) => {
        io.to(roomId).emit('receive_message', { message, senderId });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.get("/", (req, res) => {
    res.send("API running");
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
