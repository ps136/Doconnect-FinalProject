var express=require('express');
var app=express();
var router=express.Router();
var bodyParser=require('body-parser');

var adminController=require('../controllers/adminController');

app.use(bodyParser.json());


router.get('/',()=>{
    console.log("Welcome to Admin part of the DoConnect Application")
})

router.get("/getAllAdmins", adminController.getAllAdmins);
router.get("/getAdminById/:id", adminController.getAdminById);
router.put("/updateAdmin/:id", adminController.updateAdmin);
router.delete("/deleteAdmin/:id", adminController.deleteAdmin);

// Admin registration route
router.post('/registerAdmin', adminController.registerAdmin);

// User login route
router.post('/loginAdmin', adminController.loginAdmin);

//#####################################################

// Get all questions
router.get('/getAllQuestions', adminController.getAllQuestions);

// Get all answers
router.get('/getAllAnswers', adminController.getAllAnswers);

// Get all answers by id
router.get('/getAnswerById', adminController.getAnswerById);

//get answers based on question id
router.get('/getAllAnswersByQuestionId/:questionid', adminController.getAllAnswersByQuestionId);

// Create a new question
router.post('/questions', adminController.createQuestion);

// Delete a question by ID
router.delete('/deleteQuestionsById/:questionId', adminController.deleteQuestionById);

// Approve an answer by ID
router.put('/answers/:answerId/approve', adminController.approveAnswer);

// Delete an answer by ID
router.delete('/deleteAnswersById/:answerId', adminController.deleteAnswerById);

// Route to toggle user status
router.put('/toggleUser/:userId', adminController.toggleUserStatus);


module.exports = router;
