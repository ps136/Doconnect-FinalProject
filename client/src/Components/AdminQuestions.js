import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';
import QuestionForm from './QuestionForm';
import { Link } from 'react-router-dom';

function AdminQuestions() {
  const [questions, setQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [answersMap, setAnswersMap] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/getAllQuestions');
      setQuestions(response.data || []);
      setFilteredQuestions(response.data || []);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery === '') {
      setFilteredQuestions(questions);
    } else {
      const filtered = questions.filter(question =>
        question.title.toLowerCase().includes(trimmedQuery.toLowerCase()) ||
        question.content.toLowerCase().includes(trimmedQuery.toLowerCase())
      );
      setFilteredQuestions(filtered);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch();
  };

  const handleSearchButtonClick = () => {
    handleSearch();
  };

  const fetchAnswersByQuestionId = async (questionId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/getAllAnswersByQuestionId/${questionId}`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching answers:', error);
      return [];
    }
  };

  const handleFetchAnswers = async (questionId) => {
    const answers = await fetchAnswersByQuestionId(questionId);
    setAnswersMap(prevState => ({
      ...prevState,
      [questionId]: answers
    }));
  };

  const deleteQuestion = async (questionId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/deleteQuestionsById/${questionId}`);
      setQuestions(prevQuestions =>
        prevQuestions.filter(question => question._id !== questionId)
      );
      fetchQuestions();
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const approveAnswer = async (answerId) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/answers/${answerId}/approve`);
      fetchQuestions();
      for (const question of questions) {
        await handleFetchAnswers(question._id);
      }
    } catch (error) {
      console.error('Error approving answer:', error);
    }
  };

  const deleteAnswer = async (questionId, answerId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/deleteAnswersById/${answerId}`);
      setAnswersMap(prevState => ({
        ...prevState,
        [questionId]: prevState[questionId].filter(answer => answer._id !== answerId)
      }));
    } catch (error) {
      console.error('Error deleting answer:', error);
    }
  };

  const deactivateQuestion = async (questionId) => {
    try {
      await axios.put(`http://localhost:5000/api/users/deactivate/${questionId}`);
      fetchQuestions();
    } catch (error) {
      console.error('Error deactivating question:', error);
    }
  };

  const resolveQuestion = async (questionId) => {
    try {
      await axios.put(`http://localhost:5000/api/users/resolve/${questionId}`);
      fetchQuestions();
    } catch (error) {
      console.error('Error resolving question:', error);
    }
  };

  const editAnswer = (answerId) => {
    // Implement the logic to edit an answer
  };

  const editQuestion = (questionId) => {
    // Implement the logic to edit an question
  };

  return (
    <div style={{ backgroundColor:'whitesmoke' }}>
      {/* Render the QuestionForm component with isAdmin prop set to true */}
      <QuestionForm isAdmin onQuestionPost={fetchQuestions} />

      <div style={{ marginBottom: '20px' }}>
        <div style={{textAlign:'center', marginBottom:'20px'}}>
            <h2>Questions Asked</h2>
            <p>Total Questions: {questions.length}</p>
        </div>
        <Form style={{ margin: '20px', textAlign:'center' }}>
          <Form.Control
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Search any topic or questions..."
            style={{width:'60%', margin:'0 auto', borderRadius: '20px', padding: '10px', border: '1px solid #9cc'}}
          />
          <Button variant="success" onClick={handleSearchButtonClick} style={{ borderRadius: '10px', marginTop:'15px', padding: '6px 20px', color:'snow' }}>Search</Button>
        </Form>
        {filteredQuestions.map((question) => (
          <Card key={question._id} style={{ marginBottom: '20px' }}>
          <Card.Body style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              <div>
                <Card.Title>Topic: {question.title}</Card.Title>
                <div style={{display:'flex'}}>
                  <Card.Title style={{marginRight:'20px'}}>Question: {question.content}</Card.Title>
                  {(question.status === 'Resolved') && (
                  <Button variant="primary" onClick={() => editQuestion(question._id)} style={{ marginLeft: '10px' }}>Edit Question</Button>
                )}
                </div>
                <Link to={`/answer/${question._id}`} style={{ color: 'white', textDecoration: 'none', border: '1px solid white', backgroundColor: 'teal', borderRadius: '10px', padding: '8px 30px', float: 'right' }}>Reply</Link>
              </div>
              
              <Button variant="danger" onClick={() => deleteQuestion(question._id)} style={{ marginRight: '10px' }}>Delete</Button>
              <Button variant="info" onClick={() => handleFetchAnswers(question._id)}>View Answers</Button>
              <strong style={{ marginLeft: '30px' }}>Status:</strong> <span style={{ color: 'darkgreen' }}>{question.status} </span>
              {(question.status !== 'Resolved') && (
                <Button variant="warning" onClick={() => resolveQuestion(question._id)} style={{ marginRight: '10px' }}>Resolve</Button>
              )}
              {(question.status !== 'Deactivated') && (
                <Button variant="secondary" onClick={() => deactivateQuestion(question._id)}>Deactivate</Button>
              )}
            </div>
            <h6>Answers:</h6>
            <ul>
              {(answersMap[question._id] || []).map((answer) => (
                <div key={answer._id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px' }}>
                  <li>
                    {answer.answer} {answer.approved ? <span style={{ color: 'darkgreen', marginLeft: '5px', fontWeight: 'bold' }}>admin-approved!!</span> : ''}
                    {(question.status === 'Resolved') && (
                      <Button variant="primary" onClick={() => editAnswer(answer._id)} style={{ marginLeft: '10px' }}>Edit</Button>
                    )}
                  </li>
                  <Button variant="danger" onClick={() => deleteAnswer(question._id, answer._id)} style={{ margin: '0 10px' }}>Delete</Button>
                  {!answer.approved && <Button variant="success" onClick={() => approveAnswer(answer._id)}>Approve</Button>}
                </div>
              ))}
            </ul>
          </Card.Body>
        </Card>
        
        ))}
      </div>
    </div>
  );
}

export default AdminQuestions;
