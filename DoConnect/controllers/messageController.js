const Message = require('../models/MessageModel');
const User = require('../models/UserModel');

//Basic Crud Operations on messages for chatroom

// Create a new message
exports.createMessage = async (req, res) => {
  try {
    const { sender, content } = req.body;
    const newMessage = new Message({ sender, content });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all messages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single message by ID
exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a message by ID
exports.updateMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    message.content = content;
    await message.save();
    res.json(message);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message });
  }
};

// Delete a message by ID
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a messages by senderId
exports.deleteMessageBySenderId = async (req, res) => {
    const { senderId } = req.params;
  
    try {
      // Find and delete messages by senderId
      const deletedMessages = await Message.deleteMany({ sender: senderId });
  
      if (deletedMessages.deletedCount === 0) {
        return res.status(404).json({ message: 'No messages found for the specified senderId.' });
      }
  
      res.status(200).json({ message: 'Messages deleted successfully.' });
    } catch (error) {
      console.error('Error deleting messages:', error);
      res.status(500).json({ error: 'An error occurred while deleting messages.' });
    }
};




// Get the username by sender ID
exports.getUsernameBySenderId = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ username: user.username });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete all messages
exports.clearChatroom = async (req, res) => {
    try {
        // Delete all messages
        await Message.deleteMany();
        res.status(200).json({ message: "All messages deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
