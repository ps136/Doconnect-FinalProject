var express=require('express');
var app=express();
var router=express.Router();
var bodyParser=require('body-parser');

var userController=require('../controllers/userController');

app.use(bodyParser.json());

//Root route
router.get('/',()=>{
    console.log("Welcome to DoConnect Application");
})

//Crud-operation Routes
router.get("/getAllUsers", userController.getAllUsers);
router.get("/getUsersById/:id", userController.getUsersById);
router.put("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);

// User registration route
router.post('/register', userController.registerUser);

// User login route
router.post('/login', userController.loginUser);


// Ask question Route
router.post('/questions', userController.askQuestion);
//get all questions
router.get('/getAllQuestions', userController.getAllQuestions);
//get question based on id
router.get('/getQuestionById/:questionId', userController.getQuestionById);
// Route to fetch questions with approved answers
router.get('/getQuestionsWithApprovedAnswers', userController.getQuestionsWithApprovedAnswers);



//Answer the question route
router.post('/answers', userController.provideAnswer);
//get all answers
router.get('/getAllAnswers', userController.getAllAnswers);
//get answer based on answer id
router.get('/getAnswerById/:id', userController.getAnswerById);
//get answers based on question id
router.get('/getAllAnswersByQuestionId/:questionid', userController.getAllAnswersByQuestionId);


// Like a question
router.post('/likeQuestion/:questionId', userController.likeQuestion);


// Route to deactivate a question
router.put('/deactivate/:questionId', userController.deactivateQuestion);

// Route to resolve a question
router.put('/resolve/:questionId', userController.resolveQuestion);



// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports=router;