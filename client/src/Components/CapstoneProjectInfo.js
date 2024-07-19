import React from 'react';
import Header from './Header';
import backgroundImage from '../background2.jpg'; // Import the background image
import Footer from './Footer';

const CapstoneProjectInfo = ()=>{
    // Define styles for the component
    const styles = {
        container: {
            margin: '0',
            backgroundImage: `url(${backgroundImage})`, // Set background image
            backgroundSize: 'cover', // Cover the entire container
            backgroundRepeat: 'no-repeat', // Do not repeat the image
            padding: '20px', // Add padding to improve readability
            color: 'black', // Set text color to white
        },
        heading: {
            textAlign: 'center',
            padding: '15px',
            textDecoration: 'underline',
            marginBottom: '30px',
            backgroundColor: ' lightgrey rgba(0, 0, 0, 0.5)', // Add background color with transparency
        }
    };

    return (
    <>
        <Header/>
        <div className='mini-project-1' style={styles.container}>
            <h2 style={styles.heading}>Capstone-Project(Full-Stack Programming)</h2>
            <h4> DoConnect : Connecting Curiosity: Your Gateway to Shared Knowledge</h4>
            <p>DoConnect is a popular Question and Answer application in which technical questions are asked and
            answered. <br/><br/>There are 2 users in this application:<br/>1. User<br/>2. Admin<br/>
            </p><hr/>
            <h5>## User Stories:</h5>
            <p>
                1. As a User, I should be able to register, login and logout from the application.<br/>
                2. As a User, I should be able to ask any kind of questions based on any topic.<br/>
                3. As a User, I should be able to search the question based on any string written in the search box.<br/>
                4. As a User, I should be able to answer any question asked.<br/>
                5. As a User, I should be able to answer more than one question and the same question more than once.<br/>
                6. As a User, I should be able to chat with other users.<br/>
                7. As a User, I should be able to like the answers and comment on the answers provided.<br/>
            </p><hr/>
            <h5>## Admin Stories:</h5>
            <p>
                1. As an Admin, I should be able to register, login and logout from the application.<br/>
                2. As an Admin, I should be able to perform CRUD operations on Users.<br/>
                3. As an Admin, I should be able to perform CRUD operations on Questions.<br/>
                4. As an Admin, I should be able to get mail as soon as any new question is asked or any question is
                answered.<br/>
                5. As an Admin, I should be able to approve the question and answer. Any question or answer will be
                visible on the DoConnect platform only if it is approved by the admin.<br/>
                6. As an Admin, I should be able to delete the inappropriate or irrelevant Questions or Answers.<br/>
                7. As an Admin, I should be able to close the discussion thread/post for the question and update the
                status as resolved.<br/>
            </p><hr/>

            <h5>## Sprint Plan: </h5>

            <p><strong>1. Sprint I Objective:</strong><br/>
            &ensp; &ensp;1. Create database schema (along with their relationships)<br/>
            &ensp; &ensp;2. CRUD on User and Admin (login, logout, register) (using express / node js)<br/>
            &ensp; &ensp;3. Create template using React<br/>
            </p>

            <p><strong>2. Sprint II Objective:</strong><br/>
            &ensp; &ensp;1. Develop search functionality based on different criteria.<br/>
            &ensp; &ensp;2. CRUD on Question and Answer (create, remove, update, display, deactivate)<br/>
            &ensp; &ensp;3. Mark discussion thread / post as completed.<br/>
            &ensp; &ensp;4. Mark questions / answers as approved.<br/>
            &ensp; &ensp;5. Create like / comments / answers on other questions / answers.<br/>
            &ensp; &ensp;6. Implement Spring security, JWT<br/>
            &ensp; &ensp;7. Implement component and end-to-end testing<br/>
            </p>


            <p><strong>3. Sprint III Objective:</strong><br/>
            &ensp; &ensp;1. Create Data Transfer Objects<br/>
            &ensp; &ensp;2. Create Service Layer logic<br/>
            &ensp; &ensp;3. Create controller to direct rest API<br/>
            &ensp; &ensp;4. Create notification service for new question / answer added<br/>
            </p>

            <p><strong>4. Extras: </strong><br/>
            &ensp; &ensp;1. Implement chat functionality<br/>
            &ensp; &ensp;2. Integrate FrontEnd with BackEnd<br/>
            &ensp; &ensp;3. Add extra features<br/>
            &ensp; &ensp;4. Make application responsive<br/>
            </p>

            <hr/>
            <h5>## Instructions:</h5>
            <p><strong>1. Set Up MongoDB Database:</strong><br/>
            &ensp; &ensp;1. Install MongoDB on your system if not already installed.<br/>
            &ensp; &ensp;2. Create a MongoDB database to store application data.<br/>
            &ensp; &ensp;3. Design appropriate collections to store user and application information.<br/>
            </p>
                
            <p><strong>2. Develop Backend with Node.js and Express.js:</strong><br/>
            &ensp; &ensp;1. Create a Node.js project.<br/>
            &ensp; &ensp;2. Set up Express.js to handle routing and middleware<br/>
            &ensp; &ensp;3. Implement APIs for user authentication (register, login, logout) and CRUD for app.<br/>
            &ensp; &ensp;4. Ensure APIs are RESTful and follow best practices.<br/>
            &ensp; &ensp;5. Interact with MongoDB.<br/>
            </p>

            <p><strong>3. Develop Frontend with REACT :</strong><br/>
            &ensp; &ensp;1. Set up an REACT project.<br/>
            &ensp; &ensp;2. Create components for login, registration, application listing, application details, user profile, etc.<br/>
            &ensp; &ensp;3. Implement routing to navigate between different components.<br/>
            &ensp; &ensp;4. Integrate HTTP client module to communicate with the backend APIs.<br/>
            &ensp; &ensp;5. Use React Material or Bootstrap for UI components to ensure better UI.<br/>
            </p>

            <p><strong>4. Make Application Responsive:</strong><br/>
            &ensp; &ensp;1. Use CSS media queries and flexible layout techniques to ensure the application is responsive across
different devices and screen sizes.
            </p>

            <p><strong>5. Handle Session using Local Storage:</strong><br/>
            &ensp; &ensp;1. Implement session management using JSON Web Tokens (JWT).<br/>
            &ensp; &ensp;2. Store JWT tokens in the local storage to maintain user sessions.<br/>
            </p>

            <p><strong>6. Implement Proper Component Structure:</strong><br/>
            &ensp; &ensp;1. Organize React components, services, and modules following best practices and maintainability.<br/>
            </p>

            <p><strong>7. Include Client-Side Validation:</strong><br/>
            &ensp; &ensp;1. Implement client-side form validation using React forms and validators to ensure data integrity and
            improve user experience.<br/>
            </p>

            <p><strong>8. Perform Component and End-to-End Testing:</strong><br/>
            &ensp; &ensp;1. Write unit tests for React components and services using proper testing framework.<br/>
            &ensp; &ensp;2. Conduct end-to-end testing using a testing framework to ensure the application works as expected
            from the user's perspective.<br/>
            </p>

            <p><strong>9. Create a Single Page Application (SPA):</strong><br/>
            &ensp; &ensp;1. Ensure the application functions as a single-page application where navigation occurs without
            refreshing the entire page.<br/>
            &ensp; &ensp;2. Utilize React’s routing capabilities to achieve this behavior.<br/>

            </p>
             <hr/>
             
        </div>
        <div style={{marginTop:'-50px'}}>
            <Footer/>
        </div>
       
    </>
    )
}
export default CapstoneProjectInfo;