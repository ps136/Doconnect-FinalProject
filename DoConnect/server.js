const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./models/Connection');
const env = require('dotenv').config();
const http = require('http');
const cors = require('cors');
const Message = require('./models/MessageModel');

// CORS middleware
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());

// Importing the routes
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');
const messageRoutes = require('./routes/messageRoutes');

// Defining the routes
app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/messages', messageRoutes);

// Starting the server
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Attach Socket.io to the server
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log("A user connected");

    // Handle joinRoom event
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
    });

    // Handle sendMessage event
    socket.on('sendMessage', async (message) => {
        try {
            // Save the message to the database
            const newMessage = new Message({
                sender: message.sender,
                content: message.text,
                timestamp: new Date(),
            });
            await newMessage.save();

            // Broadcast the message to all users in the same room
            io.to("chatroom").emit('message', newMessage); // Emitting to "chatroom" room
            console.log(`Message sent by ${socket.id} : ${message.text}`);
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    // Handle disconnect event
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
