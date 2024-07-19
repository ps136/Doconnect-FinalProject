import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';
import Header from './Header';
import QuestionForm from './QuestionForm';
import Footer from './Footer';
import { Link } from 'react-router-dom';

function Questions() {
  const [questionsWithAnswers, setQuestionsWithAnswers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [likedQuestions, setLikedQuestions] = useState([]);

  useEffect(() => {
    fetchQuestionsWithAnswers();
    const likedQuestionsFromStorage = JSON.parse(localStorage.getItem('likedQuestions'));
    if (likedQuestionsFromStorage) {
      setLikedQuestions(likedQuestionsFromStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('likedQuestions', JSON.stringify(likedQuestions));
  }, [likedQuestions]);

  const fetchQuestionsWithAnswers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/getQuestionsWithApprovedAnswers');
      setQuestionsWithAnswers(response.data);
      // Filter out deactivated questions
      const activeQuestions = response.data.filter(({ question }) => question.status !== 'Deactivated');
      setFilteredQuestions(activeQuestions);
    } catch (error) {
      console.error('Error fetching questions with answers:', error);
    }
  };

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery === '') {
      setFilteredQuestions(questionsWithAnswers);
    } else {
      const filtered = questionsWithAnswers.filter(({ question }) =>
        question.title.toLowerCase().includes(trimmedQuery.toLowerCase()) ||
        question.content.toLowerCase().includes(trimmedQuery.toLowerCase())
      );
      // Filter out deactivated questions
      const activeQuestions = filtered.filter(({ question }) => question.status !== 'Deactivated');
      setFilteredQuestions(activeQuestions);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch();
  };

  const handleSearchButtonClick = () => {
    handleSearch();
  };

  const handleQuestionPost = async () => {
    // Perform the logic to post the question
    // After successfully posting the question, fetch the updated list of questions
    await fetchQuestionsWithAnswers();
  };

  const handleLikeClick = async (questionId) => {
    try {
      if (!likedQuestions.includes(questionId)) {
        // If the question is not already liked by the user
        await axios.post(`http://localhost:5000/api/users/likeQuestion/${questionId}`);
        // Update the likedQuestions state
        setLikedQuestions([...likedQuestions, questionId]);
        // Refresh the questions with answers after liking a question
        await fetchQuestionsWithAnswers();
      }
    } catch (error) {
      console.error('Error liking question:', error);
    }
  };

  return (
    <div>
      <Header />
      <QuestionForm onQuestionPost={handleQuestionPost} />

      <div style={{ margin: '20px', backgroundColor: 'whitesmoke' }}>
        <br />
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2>Questions Asked</h2>
          <p>Total Questions: {questionsWithAnswers.length}</p>
        </div>

        <Form style={{ margin: '20px', textAlign: 'center' }}>
          <Form.Control
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Search any topic or questions..."
            style={{ width: '60%', marginRight: 'auto', marginLeft: 'auto', borderRadius: '20px', padding: '10px', border: '1px solid #9cc' }}
          />
          <Button variant="success" onClick={handleSearchButtonClick} style={{ borderRadius: '10px', marginTop: '10px', padding: '6px 15px' }}>Search</Button>
        </Form>
        {filteredQuestions.map(({ question, answers }) => (
          <Card key={question._id} style={{ marginBottom: '20px' }}>
            <Card.Body style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Card.Title>Title: {question.title}</Card.Title>
                <div>
                  <Button variant="outline-primary" onClick={() => handleLikeClick(question._id)} disabled={likedQuestions.includes(question._id)}>Like ({question.likes || 0})</Button>
                </div>
              </div>
              <Card.Text><strong>Question: </strong>{question.content}</Card.Text>
              <div>
                <strong>Approved Answers:</strong>
                <ul>
                  {answers.map(answer => (
                    <li key={answer._id}>{answer.answer}</li>
                  ))}
                </ul>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <Link to={`/answer/${question._id}`} style={{ color: 'white', textDecoration: 'none', border: '1px solid white', backgroundColor: 'teal', borderRadius: '10px', padding: '7px 20px' }}>Reply</Link>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Questions;
