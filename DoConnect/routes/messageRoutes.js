const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Route to create a new message
router.post('/sendMessage', messageController.createMessage);

// Route to get all messages
router.get('/getAllMessages', messageController.getAllMessages);

// Route to get a single message by ID
router.get('/getMessageById/:id', messageController.getMessageById);

// Route to update a message by ID
router.put('/updateMessage/:id', messageController.updateMessage);

// Route to delete a message by ID
router.delete('/deleteMessage/:id', messageController.deleteMessage);

//Route to get the username by sender Id
router.get('/getUsernameBySenderId/:id', messageController.getUsernameBySenderId);

// DELETE request to delete messages by senderId
router.delete('/deleteMessageBySenderId/:senderId', messageController.deleteMessageBySenderId);

// DELETE request to delete all messages
router.delete('/clearChatroom', messageController.clearChatroom);


module.exports = router;
