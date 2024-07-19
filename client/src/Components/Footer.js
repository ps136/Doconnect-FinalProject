import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="mt-5" style={{padding:'20px', backgroundColor: '#ced4da'}}>
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>About Us</h5>
                        <p>This application is designed to help you find answers to your questions quickly and easily. Simply type your question into the chat box and I will do my best to provide you with a comprehensive and informative answer.</p>
                    </Col>
                    <Col md={4}>
                        <h5>Contact Us</h5>
                        <p>Email: prasoonsharma136@gmail.com<br />Mobile: +91-9079297052</p>
                    </Col>
                    <Col md={4}>
                        <h5>Follow Us</h5>
                        <p>Connect with us on social media:</p>
                        <div className="social-icons">
                            {/* Add your social media icons here */}
                            <Link to="#"><i className="fab fa-facebook"></i></Link>
                            <Link to="#"><i className="fab fa-twitter"></i></Link>
                            <Link to="#"><i className="fab fa-instagram"></i></Link>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className="footer-bottom py-3">
                <Container>
                    <Row>
                        <Col>
                            <p className="text-center mb-0">© 2024 <Link to="/home">DoConnect App.</Link> All rights reserved.</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    );
}

export default Footer;
