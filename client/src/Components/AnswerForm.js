import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams hook
import Footer from './Footer';

function AnswerForm() {
  const { questionId } = useParams();
  console.log('Question ID:', questionId);

  const [question, setQuestion] = useState(null);
  const [newAnswer, setNewAnswer] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const navigate = useNavigate();
  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/getQuestionById/${questionId}`);
      setQuestion(response.data);
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  const submitAnswer = async () => {
    try {
      await axios.post(`http://localhost:5000/api/users/answers`, {
        questionId: questionId,
        userId: localStorage.getItem('userId') || localStorage.getItem('adminId'),
        answer: newAnswer
      });
      setNewAnswer('');
      setSuccessMessage('Answer submitted successfully');

      setTimeout(()=>{
        setSuccessMessage('');
        // Check if the user is an admin
        const isAdmin = localStorage.getItem('adminId');
        if (isAdmin) {
          // If the user is an admin, navigate to the admin dashboard
          navigate('/admin-dashboard');
        } else {
          // If the user is not an admin, navigate to the questions page
          navigate('/questions');
        } 
      }, 2000);
      
    } catch (error) {
      console.error('Error posting answer:', error);
    }
  };

  return (
    
    <div style={{ margin: '20px', textAlign: "center" , backgroundColor:'whitesmoke'}}>
      {question && ( // Conditionally render if question is not null
        <>
          <h2>Question Details:</h2>
          <h5>Topic: {question.title}</h5>
          <h5>Question: {question.content}</h5>
        </>
      )}
      <h2>Answer the above question below: </h2>
      <textarea style={{ width: '60%', height: '200px', margin: '20px' }}
        value={newAnswer}
        onChange={(e) => setNewAnswer(e.target.value)}
        placeholder="Enter your answer here"
      /><br />
      <Button onClick={submitAnswer}>Post Answer</Button>
      {successMessage && <p style={{ color: 'darkgreen' }}>{successMessage}</p>}

      <Footer/>
    </div>
  );
}

export default AnswerForm;
