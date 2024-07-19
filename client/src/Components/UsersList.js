import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; // Import CSS file for styling
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { registerUser, getAllUsers, deleteUser, updateUser } from '../Services/services'; // Import updateUser function

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: '',
        mobile: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [updateUserDetails, setUpdateUserDetails] = useState(null); // State to hold user details for update

    // Function to fetch users data from the backend
    const fetchUsers = async () => {
        try {
            const response = await getAllUsers();
            setUsers(response); // Set the users state with data from the backend
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Fetch users data when the component mounts
    useEffect(() => {
        fetchUsers();
    }, []);

    // Function to delete a user
    const removeUser = async (userId) => {
        try {
            await deleteUser(userId);
            // After deletion, fetch users data again to update the list
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

     // Function to disable or activate a user
     const toggleUserStatus = async (userId, currentStatus) => {
        try {
            const newStatus = currentStatus === 'active' ? 'disabled' : 'active';
            await axios.put(`http://localhost:5000/api/admin/toggleUser/${userId}`, { status: newStatus });
            // After toggling user status, fetch users data again to update the list
            fetchUsers();
        } catch (error) {
            console.error('Error toggling user status:', error);
        }
    };

    // Function to add or update a user
    const addUser = async () => {
        try {
            if (updateUserDetails) {
                // Update user details if updateUserDetails state is set
                await updateUser(updateUserDetails._id, newUser); // Call the updateUser function from services
                setSuccessMessage('User details updated successfully.');
            } else {
                // Add new user if updateUserDetails state is not set
                await registerUser(newUser); // Call the registerUser function from services
                setSuccessMessage('New user added successfully.');
            }

            // After adding or updating user, fetch users data again to update the list
            fetchUsers();
            // Clear form fields
            setNewUser({
                username: '',
                email: '',
                password: '',
                mobile: ''
                // Add more fields as needed
            });

            // Hide success message after 5 seconds
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);

            // Reset updateUserDetails state to null after 5 seconds
            setTimeout(() => {
                setUpdateUserDetails(null);
            }, 3000);

        } catch (error) {
            console.error('Error adding or updating user:', error);
        }
    };

    // Function to set user details for update
    const updateUserDetail = (user) => {
        setUpdateUserDetails(user);
        // Set form fields with user details for update
        setNewUser({
            username: user.username,
            email: user.email,
            password: user.password,
            mobile: user.mobile
            // Add more fields as needed
        });
    };

    return (
        <>
            {/* Header */}
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
                cursor: 'pointer'
            }}>
                {/* Button to navigate to the admin dashboard */}
                <Link to="/admin-dashboard" >
                    <Button variant="secondary" style={{ float: 'left' }}>Go to Admin Dashboard</Button>
                </Link>
                <h2 style={{ marginRight: '80px' }}>Users of DoConnect Application</h2>
            </div>

            {/* Users List */}
            <div className="users-list-container" style={{backgroundColor:'whitesmoke'}}>
                <div className="table-container">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Status</th> {/* New column for user status */}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mobile}</td>
                                    <td>{user.status}</td> {/* Display user status */}
                                    <td>
                                        <Button onClick={() => removeUser(user._id)} style={{ marginRight: '10px', backgroundColor: 'firebrick' }}>Delete</Button>
                                        <Button onClick={() => updateUserDetail(user)} style={{ marginRight: '10px', backgroundColor: 'darkcyan' }}>Edit</Button>
                                        <Button onClick={() => toggleUserStatus(user._id, user.status)} style={{ backgroundColor: (user.status === 'active') ? 'gray' : 'darkgreen' }}>
                                            {user.status === 'active' ? 'Disable' : 'Activate'}
                                        </Button> {/* Toggle button to disable/activate user */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Form to add new user */}
            <hr />
            <h3 style={{ margin: "0 20px", textAlign: 'center' }}>Fill this form to register</h3>
            <p style={{ color: 'darkgreen', textAlign: 'center' }}>(If you want to update details of any user click on edit button for the same and then you can update the details of the user)</p>
            <div style={{ width: '50%', padding: '20px', margin: 'auto', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' }}>
                <input style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                    type="text"
                    placeholder="Enter Username"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                /><br />
                <input style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                    type="email"
                    placeholder="Enter Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                /><br />
                <input style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                    type="password"
                    placeholder="Enter Password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                /><br />
                <input style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                    type="text"
                    placeholder="Enter Mobile"
                    value={newUser.mobile}
                    onChange={(e) => setNewUser({ ...newUser, mobile: e.target.value })}
                /><br />
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button variant="success" onClick={addUser}>
                        {updateUserDetails ? 'Update Details' : 'Add User'}
                    </Button>
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                </div>
            </div>
            <hr />


            <Footer />
        </>
    );
};

export default UsersList;
