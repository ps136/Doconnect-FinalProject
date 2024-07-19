// Import the Admin model
const Admin = require('../models/AdminModel');
const User = require('../models/UserModel');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Question = require('../models/QuestionModel');
const Answer = require('../models/AnswerModel');

//save new admin details
exports.registerAdmin = async(req, res)=>{

    res.setHeader('Access-Control-Allow-Origin','*');

    console.log('coming in registerAdmin');
    const newAdmin = new Admin({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        mobile:req.body.mobile
    });
    await newAdmin.save()
        .then((data) => {
            //const token = generateToken(newUser._id);
            console.log('Admin Registered successfully:', data);
            res.status(200).json(data);
        })
        .catch((error) => {
            console.error('Error saving admin:', error);
            res.status(400).json({message: error.message});
        });
}

// Login and Verify the admin
exports.loginAdmin = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin','*');

    try {
        const { usernameOrEmail, password } = req.body;

        // Check if admin with provided username or email exists
        const admin = await Admin.findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
        });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

       // Check password
       const passwordMatch = await bcrypt.compare(password, admin.password);

       // Check if the provided password matches either the hashed password or the plaintext password
       if (!passwordMatch && password !== admin.password) {
           return res.status(401).json({ message: 'Invalid credentials' });
       }
        // Generate JWT token
        const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send token and admin data in response
        res.status(200).json({ token, admin });

    } catch (error) {
        console.error('Admin Login failed:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json(admin);
    } catch (error) {
        console.error('Error fetching admin by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json(updatedAdmin);
    } catch (error) {
        console.error('Error updating admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.deleteAdmin = async (req, res) => {
    try {
        const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        console.error('Error deleting admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//--------------------------------------------------------------------------------------------------




//--------------------------------------------------------------------------------------------------

// Method to get all questions
exports.getAllQuestions = async (req, res) => {
    try {
        // Retrieve all questions from the database
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error getting all questions:', error);
        res.status(500).json({ error: 'An error occurred while fetching all questions' });
    }
};

// Create a new question
exports.createQuestion = async (req, res) => {
    try {
        const { question } = req.body;
        const newQuestion = new Question({ question });
        await newQuestion.save();
        res.status(201).json({ message: 'Question created successfully' });
    } catch (error) {
        console.error('Error creating question:', error);
        res.status(500).json({ error: 'An error occurred while creating the question' });
    }
};

// Delete a question by ID
exports.deleteQuestionById = async (req, res) => {
    try {
        const { questionId } = req.params;
        await Question.findByIdAndDelete(questionId);
        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
        console.error('Error deleting question:', error);
        res.status(500).json({ error: 'An error occurred while deleting the question' });
    }
};

// Approve an answer by ID
exports.approveAnswer = async (req, res) => {
    try {
        const { answerId } = req.params;
        await Answer.findByIdAndUpdate(answerId, { approved: true });
        res.status(200).json({ message: 'Answer approved successfully' });
    } catch (error) {
        console.error('Error approving answer:', error);
        res.status(500).json({ error: 'An error occurred while approving the answer' });
    }
};

// Delete an answer by ID
exports.deleteAnswerById = async (req, res) => {
    try {
        const { answerId } = req.params;
        await Answer.findByIdAndDelete(answerId);
        res.status(200).json({ message: 'Answer deleted successfully' });
    } catch (error) {
        console.error('Error deleting answer:', error);
        res.status(500).json({ error: 'An error occurred while deleting the answer' });
    }
};

// Method to get all answers
exports.getAllAnswers = async (req, res) => {
    try {
        // Retrieve all answers from the database
        const answers = await Answer.find();
        res.status(200).json(answers);
    } catch (error) {
        console.error('Error getting all answers:', error);
        res.status(500).json({ error: 'An error occurred while fetching all answers' });
    }
};

// Controller method to get an answer by ID
exports.getAnswerById = async (req, res) => {
    try {
        // Extract the answer ID from the request parameters
        const answerId = req.params.id;

        // Find the answer by ID in the database
        const answer = await Answer.findById(answerId);

        // If the answer is not found, return an error response
        if (!answer) {
            return res.status(404).json({ error: 'Answer not found' });
        }

        // If the answer is found, return it in the response
        res.status(200).json(answer);
    } catch (error) {
        // If an error occurs, return an error response
        console.error('Error getting answer by ID:', error);
        res.status(500).json({ error: 'An error occurred while getting the answer' });
    }
};

// Controller method to get all answers of a particular question based on question ID
exports.getAllAnswersByQuestionId = async (req, res) => {
    try {
        // Extract the question ID from the request parameters
        const questionId = req.params.questionid;

        // Find the answers by question ID in the database
        const answers = await Answer.find({questionId : questionId});
        answers
        // If the answer is not found, return an error response
        if (!answers) {
            return res.status(404).json({ error: 'Answers not found' });
        }

        // If the answers are found, return them in the response
        res.status(200).json(answers);
    } catch (error) {
        // If an error occurs, return an error response
        console.error('Error getting answer by question ID:', error);
        res.status(500).json({ error: 'An error occurred while getting the answers' });
    }
};



//-----------------------------------------------

//-------------------------------------------------


//----------------------------------------------

// Controller method to toggle user status
exports.toggleUserStatus = async (req, res) => {
    const { userId } = req.params;
    const { status } = req.body;

    try {
        // Find the user by ID and update the status
        await User.findByIdAndUpdate(userId, { status });

        res.status(200).json({ message: `User status toggled to ${status} successfully` });
    } catch (error) {
        console.error('Error toggling user status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};