import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import {registerAdmin} from '../Services/services';
import loginBackground from './image1.jpg';

function AdminRegisterForm() {
    const initialValues = {
        username: "",
        email: "",
        password: "",
        mobile: ""
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required("Username is required")
            .matches(/^\S*$/, "Username should contain no spaces"),
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required")
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/, "Email must be properly formatted"),
            password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters")
            .matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/, "Password must contain at least one uppercase letter, one number, and one special character"),
        mobile: Yup.string()
            .required("Mobile is required")
            .matches(/^[6-9]\d{9}$/, "Mobile number must be 10 digits long and start with a number between 6 to 9")
    });

    //password toggle feature
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();

    const onSubmit = async (values, { setSubmitting }) => {
        registerAdmin(values);
        alert("Admin Registered successfully, please login")
        navigate('/');
        // Handle form submission here
        // try {
        //     const response = await axios.post("http://localhost:5000/api/users/register", values);
        //     console.log("The response is : " + response.data);
        //     alert('You are registered successfully, Please login now ')
        //     navigate('/');
        // } catch (error) {
        //     if (error.response && error.response.status === 409) {
        //         console.error("Username or email already exists");
        //         // Handle duplicate key error (username or email already exists)
        //     } else {
        //         console.error("Registration Failed", error);
        //     }
        // }


    };

    return (
        <div style={{
            position: 'relative',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <img src={loginBackground} alt="background" style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'blur(5px)',
                zIndex: -1,
            }} />

            <div style={{
                border: '1px solid black',
                width: '90%',
                maxWidth: '400px',
                margin: 'auto', // Center horizontally
                padding: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }}>
            <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Admin Registration here</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form style={{ margin: '20px' }}>
                        <div className="mb-3">
                            <label htmlFor="username" className="label-text-bold">Admin Username:</label>
                            <Field type="text" name="username" id="username" className="form-control" placeholder="Enter username" />
                            <div className="text-danger"><ErrorMessage name="username" /></div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="label-text-bold">Admin Email:</label>
                            <Field type="email" name="email" id="email" className="form-control" placeholder="Enter email" />
                            <div className="text-danger"><ErrorMessage name="email" /></div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="label-text-bold">Admin Password:</label>
                            <div className="input-group">
                                <Field type={showPassword ? "text" : "password"} name="password" id="password" className="form-control" placeholder="Enter Password" />
                                <button type="button" className="btn btn-outline-secondary" onClick={togglePasswordVisibility}>
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                            <div className="text-danger"><ErrorMessage name="password" /></div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="mobile" className="label-text-bold">Admin Mobile:</label>
                            <Field type="text" name="mobile" id="mobile" className="form-control" placeholder="Enter Mobile No" />
                            <div className="text-danger"><ErrorMessage name="mobile" /></div>
                        </div>

                        <Button variant="primary" type="submit" >
                            Register as Admin
                        </Button>

                        <h5>Already an admin? <Link to='/'>Login</Link> with admin credentials</h5>
                    </Form>
                )}
            </Formik>
        </div>
        </div>
    );
}

export default AdminRegisterForm;
