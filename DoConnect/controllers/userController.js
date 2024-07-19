// Import the User model
const User = require('../models/UserModel');

const Question = require('../models/QuestionModel');
const Answer = require('../models/AnswerModel'); 

//for authentication
const jwt=require('jsonwebtoken');
//for Hashing the password
const bcrypt = require('bcryptjs');
//for SMTP mail send feature
const nodemailer = require('nodemailer');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Configuring NodeMailer - notification features
// Configure Nodemailer transporter with Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rohit.2214.2000@gmail.com', // Your actual Gmail address
        pass: 'sunder pichai', // Your actual Gmail password
    },
});

// Function to send notification email to admin
const sendNotificationEmail = (userData) => {
    const mailOptions = {
        from: 'rohit.2214.2000@gmail.com', // Your actual Gmail address
        to: 'prasoonsharma136@gmail.com', // Admin's email address
        subject: 'New User Registered',
        html: `<p>A new user has registered with the following details:</p>
            <ul>
            <li>Username: ${userData.username}</li>
            <li>Email: ${userData.email}</li>
            <li>Mobile: ${userData.mobile}</li>
            </ul>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Save the new user to the database
exports.registerUser = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile,
    });

    try {
        const savedUser = await newUser.save();
        console.log('User Registered successfully:', savedUser);

        sendNotificationEmail(req.body); // Send notification email to admin

        res.status(200).json(savedUser);
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(400).json({ message: error.message });
    }
};


// Login and Verify the user
exports.loginUser = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin','*');

    try {
        const { usernameOrEmail, password } = req.body;

        // Find user by username or email
        const user = await User.findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if user is disabled
        if (user.status === 'disabled') {
            return res.status(403).json({ message: 'Your account has been disabled. Please contact the administrator.' });
        }

        // Check password
        const passwordMatch = await bcrypt.compare(password, user.password);

        // Check if the provided password matches either the hashed password or the plaintext password
        if (!passwordMatch && password !== user.password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send token and user data in response
        res.status(200).json({ token, user });

    } catch (error) {
        console.error('Login failed:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//retrieve all users from users collection
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//retrieve all users from users by id property collection
exports.getUsersById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//updating the user based on specific id
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//removing the user based on id
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};







// ----------------------------------------------------
//----------------------------------------------------








// Method to ask a question
exports.askQuestion = async (req, res) => {
    try {
        const { title, content, userId } = req.body;

        // Check if a question with the same title and content already exists
        const existingQuestion = await Question.findOne({ title, content });

        if (existingQuestion) {
            // If a matching question is found, return a response indicating that the question already exists
            return res.status(400).json({ message: 'This question already exists' });
        }

        // Create a new question
        const question = new Question({
            title,
            content,
            userId
        });

        // Save the question to the database
        const savedQuestion = await question.save();

        // Send a success response with the saved question
        res.status(201).json(savedQuestion);
    } catch (error) {
        console.error('Error asking question:', error);
        res.status(500).json({ error: 'An error occurred while asking the question' });
    }
};


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

// Controller method to get a question by ID
exports.getQuestionById = async (req, res) => {
    try {
        // Extract the question ID from the request parameters
        const questionId = req.params.questionId;

        // Find the question by ID in the database
        const question = await Question.findById(questionId);

        // If the question is not found, return an error response
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        // If the question is found, return it in the response
        res.status(200).json(question);
    } catch (error) {
        // If an error occurs, return an error response
        console.error('Error getting question by ID:', error);
        res.status(500).json({ error: 'An error occurred while getting the question' });
    }
};

// Method to provide an answer to a question
exports.provideAnswer = async (req, res) => {
    try {
        const { questionId, userId, answer } = req.body;
        // Create a new answer
        const newAnswer = new Answer({
            questionId,
            userId,
            answer
        });
        // Save the answer to the database
        const savedAnswer = await newAnswer.save();
        res.status(201).json(savedAnswer);
    } catch (error) {
        console.error('Error providing answer:', error);
        res.status(500).json({ error: 'An error occurred while providing the answer' });
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

//--------------------------------------------------------------------------------





//=======================================================================================


//Fetching the questions with approved answers
exports.getQuestionsWithApprovedAnswers = async (req, res) => {
    try {
      // Fetch all questions
      const questions = await Question.find();
  
      // For each question, fetch approved answers
      const questionsWithAnswers = await Promise.all(
        questions.map(async (question) => {
          const answers = await Answer.find({ questionId: question._id, approved: true });
          return { question, answers };
        })
      );
  
      res.status(200).json(questionsWithAnswers);
    } catch (error) {
      console.error('Error fetching questions with approved answers:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


//For LIKES and DESLIKES feature for users

// Like a question
exports.likeQuestion = async (req, res) => {
    const { questionId } = req.params;
  
    try {
      const question = await Question.findById(questionId);
  
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      // Increment the likes count
      question.likes += 1;
  
      // Save the updated question
      await question.save();
  
      res.status(200).json({ message: 'Question liked successfully' });
    } catch (error) {
      console.error('Error liking question:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////////////////////////////////////




// Controller method to deactivate a question
exports.deactivateQuestion = async (req, res) => {
  const { questionId } = req.params;
  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    question.status = 'Deactivated';
    await question.save();
    res.status(200).json({ message: 'Question deactivated successfully' });
  } catch (error) {
    console.error('Error deactivating question:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller method to resolve a question
exports.resolveQuestion = async (req, res) => {
  const { questionId } = req.params;
  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    question.status = 'Resolved';
    await question.save();
    res.status(200).json({ message: 'Question resolved successfully' });
  } catch (error) {
    console.error('Error resolving question:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

