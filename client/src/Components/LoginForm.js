import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import { loginUser, loginAdmin } from "../Services/services";
import loginBackground from './image1.jpg';

function LoginForm() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        usernameOrEmail: "",
        password: ""
    });

    const handleData = (event) => {
        const { name, value } = event.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const verifyUser = async (event, userType) => {
        event.preventDefault();
        try {
            let response;
            if (userType === 'user') {
                response = await loginUser(userData);
                localStorage.setItem('usertoken', response.token); // Save token to localStorage
                localStorage.setItem('userId', response.user._id); // Save userId to localStorage
                navigate('/home');
            } else if (userType === 'admin') {
                response = await loginAdmin(userData);
                localStorage.setItem('admintoken', response.token); // Save token to localStorage
                localStorage.setItem('adminId', response.admin._id); // Save adminId to localStorage
                navigate('/admin-dashboard');
            }
            console.log(response);
        } catch (error) {
            console.error("Login failed:", error);
            if (error.response.status === 403) {
                alert("You are restricted from logging in. Please contact the administrator.");
            } else {
                alert("Invalid login credentials, please try again. If new user? then click on register");
            }
        }
    };
    

    return (
        <div style={{
            position: 'relative', // Make the container position relative
            height: '100vh',
            overflow: 'hidden', // Prevent scrolling of the background image
        }}>
            {/* Background image with blur */}
            <img src={loginBackground} alt="background" style={{
                position: 'fixed', // Make the image fixed
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'blur(5px)',
                zIndex: -1,
            }} />

            {/* Login box */}
            <div style={{
                border: '1px solid black',
                width: '90%', // Adjusted to 90% for responsiveness
                maxWidth: '400px', // Added max-width to prevent content overflow
                margin: 'auto',
                marginTop: '20vh', // Adjust vertical position as needed
                padding: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
            }}>
                <h2 style={{ textAlign: 'center' }}>Please Login Here</h2>
                <Form>
                    <div>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor="usernameOrEmail" className="label-text-bold">Username or Email:</Form.Label>
                            <Form.Control type="text" name="usernameOrEmail" id="usernameOrEmail" value={userData.usernameOrEmail} onChange={handleData} placeholder="Enter username or email" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="password" className="label-text-bold">Password:</Form.Label>
                            <Form.Control type="password" name="password" id="password" value={userData.password} onChange={handleData} placeholder="Enter Password" />
                        </Form.Group>

                        <Button variant="dark" onClick={(e) => verifyUser(e, 'user')}>
                            Login as User
                        </Button>

                        <Button variant="success" onClick={(e) => verifyUser(e, 'admin')} style={{ marginLeft: '10px' }}>
                            Login as Admin
                        </Button>

                        <div style={{ marginTop: '20px' }}>
                            <h5>If new User Click on <Link to='/register'>Register</Link></h5>
                            <h5>Register for new admin <Link to='/admin-register'>New Admin</Link></h5>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default LoginForm;
