import React from 'react';
import Header from './Header';
import Footer from './Footer';
import AdminQuestions from './AdminQuestions';

const AdminDashboard = () => {


    return (
        <>
        <Header/>
        <h2 style={{
            //background related styles
            width: '100%',
            height: '10%',
            background: 'linear-gradient(135deg, #c2c5aa, #a99985)',

            //text related styles
            padding:'15px',
            textAlign: 'center',
            fontWeight:'bold',
            color: '#212529',
            backgroundColor:'',
            textShadow: '4px 4px 5px rgba(0, 0, 0, 0.5)',
            cursor: 'pointer', // Make it look clickable

            margin:'0'
        }}>
            Welcome to Admin Dashboard  
        </h2>

        <AdminQuestions />
        <Footer/>
        </>
    )
    
}

export default AdminDashboard;
