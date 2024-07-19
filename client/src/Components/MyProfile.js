import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

function MyProfile() {
    const [userDetails, setUserDetails] = useState(null);
    const [adminDetails, setAdminDetails] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [editedUserDetails, setEditedUserDetails] = useState({
        username: '',
        email: '',
        mobile: '',
        password: ''
    });

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const adminId = localStorage.getItem('adminId');
        if (userId) {
            fetchUserDetails(userId);
        } else if (adminId) {
            fetchAdminDetails(adminId);
        }
    }, []);

    const navigate = useNavigate();

    const fetchUserDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/getUsersById/${id}`);
            setUserDetails(response.data);
            setEditedUserDetails(response.data);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const fetchAdminDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/getAdminById/${id}`);
            setAdminDetails(response.data);
            setEditedUserDetails(response.data);
        } catch (error) {
            console.error('Error fetching admin details:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserDetails({ ...editedUserDetails, [name]: value });
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const adminId = localStorage.getItem('adminId');
            if(userId){
                await axios.put(`http://localhost:5000/api/users/updateUser/${userId}`, editedUserDetails);
                fetchUserDetails(userId);
            }
            else{
                await axios.put(`http://localhost:5000/api/admin/updateAdmin/${adminId}`, editedUserDetails);
                fetchAdminDetails(adminId);
            }

            setSuccessMessage('User details updated successfully');
            setTimeout(() => {
                setSuccessMessage('');
                setIsEditing(false);
            }, 1000);

        } catch (error) {
            console.error('Error updating user details:', error);
        }
    };

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
        <>
        <Header/>
        <div style={{ width: '100%', wordWrap: 'break-word' }}>
            <div style={{
                width: '100%',
                height: '10%',
                background: 'linear-gradient(135deg, #c2c5aa, #a99985)',
                padding: '15px',
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#212529',
                backgroundColor: '',
                textShadow: '4px 4px 5px rgba(0, 0, 0, 0.5)',
                cursor: 'pointer',
                marginBottom: '50px',
                display:'flex',
                justifyContent:'space-between'
                }}>
                {/* Button to navigate to the admin dashboard */}
                <Link to={localStorage.getItem('adminId') ? "/admin-dashboard" : "/home"}>
                    <Button variant="secondary" style={{ float: 'left' }}>Go to homepage</Button>
                </Link>
                <h2>Welcome {localStorage.getItem('adminId') ? 'admin to your' : 'to your user'} profile</h2>
                <Button variant="danger" style={{ float: 'right' }}
                onClick={handleLogout}>Logout</Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '45%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', marginRight: '20px', backgroundImage: 'linear-gradient(to bottom left, #8d99ae , #e5e5e5)', wordWrap: 'break-word' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>My Details</h2>
                    {(userDetails || adminDetails) && (
                        <div style={{ fontSize: '16px', marginTop:'20px', wordWrap: 'break-word' }}>
                            <div style={{ marginBottom: '10px' }}>
                                <strong style={{marginRight:'20px'}}>Username :</strong> {(userDetails?.username || adminDetails?.username)}
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <strong style={{marginRight:'20px'}}>Email :</strong> {(userDetails?.email || adminDetails?.email)}
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <strong style={{marginRight:'20px'}}>Mobile :</strong> {(userDetails?.mobile || adminDetails?.mobile)}
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <strong style={{marginRight:'20px'}}>Password :</strong> {(userDetails?.password || adminDetails?.password)}
                            </div>
                        </div>
                    )}
                    {!isEditing && (
                        <div style={{ textAlign: 'center', marginTop:'30px' }}>
                            <Button onClick={handleEditClick}>Click to Edit Details</Button>
                        </div>
                    )}

                </div>
                <div style={{ width: '45%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundImage: 'linear-gradient(to bottom right, #8d99ae, #e5e5e5)', wordWrap: 'break-word' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Edit Profile</h2>
                    {isEditing && (
                        <>
                            <input type="text" name="username" value={editedUserDetails.username} onChange={handleInputChange} style={{ marginBottom: '10px', width: '100%', padding: '5px' }} /><br />
                            <input type="text" name="email" value={editedUserDetails.email} onChange={handleInputChange} style={{ marginBottom: '10px', width: '100%', padding: '5px' }} /><br />
                            <input type="text" name="mobile" value={editedUserDetails.mobile} onChange={handleInputChange} style={{ marginBottom: '10px', width: '100%', padding: '5px' }} /><br />
                            <input type="text" name="password" value={editedUserDetails.password} onChange={handleInputChange} style={{ marginBottom: '10px', width: '100%', padding: '5px' }} /><br />
                            <div style={{ textAlign: 'center' }}>
                                <Button onClick={handleSaveClick}>Update Details</Button>
                                {successMessage && <p style={{ color: 'darkgreen' }}>{successMessage}</p>}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
        </>

        
    );
}

export default MyProfile;

/*
NOTES: 
The question mark (?) is the optional chaining operator in JavaScript. It is used to access properties of an object that may be null or undefined without causing an error.

In the expression userDetails?.mobile, if userDetails is null or undefined, the expression evaluates to undefined without throwing an error. If userDetails is not null or undefined, it accesses the mobile property of userDetails.

Similarly, adminDetails?.mobile accesses the mobile property of adminDetails if adminDetails is not null or undefined.

So, (userDetails?.mobile || adminDetails?.mobile) will use the mobile number from userDetails if it exists, and if not, it will use the mobile number from adminDetails. If both userDetails and adminDetails are null or undefined, the expression will evaluate to undefined.
*/