import React from 'react';
import Header from './Header';
import Footer from './Footer';
import homeImage from './homeBackground2.jpg';

const Home = () => {
    return (
        <>
            <Header />
            <div style={{
                textAlign: 'center',
                height: '80vh', // Adjusted to fill more of the viewport
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <img
                    src={homeImage}
                    alt="homepage background"
                    style={{
                        width: '100%',
                        height: '100%', // Adjusted to fill the container
                        objectFit: 'cover', // Maintain aspect ratio without stretching
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: -1,
                    }}
                />
                <h2 style={{ zIndex: 1, color:'wheat', fontWeight:'bold', fontSize:'3rem' }}>Welcome to the homepage</h2>
            </div>
            <Footer />
        </>
    );
}

export default Home;
