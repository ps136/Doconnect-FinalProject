import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

function QuestionForm({ isAdmin, onQuestionPost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submitQuestion = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const adminId = localStorage.getItem('adminId');
      const response = await axios.post('http://localhost:5000/api/users/questions', {
        title: title,
        content: content,
        userId: userId || adminId
      });
      setTitle('');
      setContent('');
      if (response.status === 201) {
        setSuccessMessage('Question submitted successfully');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
        if (typeof onQuestionPost === 'function') {
          onQuestionPost(); // Trigger the onQuestionPost function to fetch updated questions
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred while submitting the question');
      }
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  return (
    <div style={{ padding:'20px',textAlign:"center"}}>
      <h2>Ask a Question</h2>
      <input style={{width:'60%', margin:'10px'}}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
      /><br />
      <textarea style={{width:'60%', height:'200px', marginTop:'10px', marginBottom:'20px'}}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your question here"
      /><br />
      <Button onClick={submitQuestion}>Post Question</Button>
      {successMessage && <p style={{ color: 'darkgreen' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <br/><br/><hr/>
    </div>
  );
}

export default QuestionForm;
