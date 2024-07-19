import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../doconnect-favicon-color.png';

function Header() {
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem('adminId'); // Check if admin is logged in

    const handleLogout = async () => {
        try {
            // Perform logout logic here
            // For example, clear local storage or delete authentication token
            localStorage.clear();
            // Redirect to the login page after logout
            alert("Logout successfully!!");
            navigate("/");

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while logging out. Please try again.');
        }
    };

    return (
        <Navbar bg="dark" data-bs-theme="dark" style={{marginTop:'-8px', padding:'0 0'}}>
            <img src={logo} alt="Logo" height="70" style={{ marginLeft: '40px' }}  />
            <Container style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Navbar.Brand as={ Link } to="/capstone-project-info" style={{ fontSize: 'large' }}>DoConnect</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={ Link } to="/home">Home</Nav.Link>
                        <Nav.Link as={ Link } to="/questions">Questions</Nav.Link>
                        <Nav.Link as={ Link } to="/chatroom">Join Chatroom</Nav.Link>

                        {isAdmin && 
                            <div style={{display:"flex"}}>
                                <Nav.Link as={Link} to="/admin-dashboard">Admin Dashboard</Nav.Link>

                                <Nav.Link as={Link} to="/users-list">Users List</Nav.Link>
                            </div>
                            
                        } 

                        <Nav.Link as={Link} to="/my-profile">My Profile</Nav.Link>
                    </Nav>
                </div>
                <div>
                    <Nav.Link className="ml-auto">
                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    </Nav.Link>
                </div>
            </Container>
        </Navbar>
    );
}

export default Header;
