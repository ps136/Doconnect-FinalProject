import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import io from "socket.io-client";
import axios from "axios"; // Import Axios
import Header from "./Header";
import Footer from "./Footer";

const Chatroom = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState('');

    const socket = useRef(null);
    const userId = localStorage.getItem('userId');
    const adminId = localStorage.getItem('adminId');

    const inputRef = useRef(null);

    useEffect(() => {
        // Initialize Socket.IO connection when component mounts
        socket.current = io("http://localhost:5000/");
        socket.current.emit("joinRoom", "chatroom");
        console.log('Joined chatroom'); // Log when joining room
    
        // Listen for incoming messages from the server
        socket.current.on("message", async (message) => {
            console.log('Received message:', message); // Log received messages
    
            // Fetch the username for the sender of the incoming message
            try {
                const usernameResponse = await axios.get(`http://localhost:5000/api/messages/getUsernameBySenderId/${message.sender}`);
                const usernameData = usernameResponse.data;
    
                // Update the message with the fetched username
                const updatedMessage = {
                    ...message,
                    username: usernameData.username
                };
    
                // Update the state with the message containing the username
                setMessages((prevMessages) => [...prevMessages, updatedMessage]);
                scrollToInput(); // Scroll to the latest message
            } catch (error) {
                console.error("Error fetching username:", error);
            }
        });
    
        // Fetch initial messages from the server
        fetchMessages();
    
        // Scroll to the send message section when component mounts
        scrollToInput();
    
        return () => {
            // Clean up Socket.IO connection when component unmounts
            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, []);
    
    

    useEffect(() => {
        // Scroll to the send message section whenever messages change
        scrollToInput();
    }, [messages]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/messages/getAllMessages");
            const messages = response.data;
            
            // Fetch the username for each sender ID
            const messagesWithUsernames = await Promise.all(
                messages.map(async (message) => {
                    const usernameResponse = await axios.get(`http://localhost:5000/api/messages/getUsernameBySenderId/${message.sender}`);
                    const usernameData = usernameResponse.data;
                    return {
                        ...message,
                        username: usernameData.username
                    };
                })
            );

            setMessages(messagesWithUsernames);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();

        if (inputMessage.trim() !== "") {
            if (adminId) {
                alert("You are an admin and chatbox is only for users to send messages!!");
                return;
            }
            else{
                socket.current.emit("sendMessage", { sender: userId, text: inputMessage });
                setInputMessage("");
            }
        }
        setSuccessMessage('Message sent');
        fetchMessages();
        
        setTimeout(()=>{
            setSuccessMessage('');
        }, 1000)
    
    };

    const deleteMessage = async (e, messageId) => {
        e.preventDefault(); // Prevent default behavior(like scrolling to msg input box)
        try {
            await axios.delete(`http://localhost:5000/api/messages/deleteMessage/${messageId}`);
            setMessages(messages.filter(message => message._id !== messageId));
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    };

    const clearChatroom = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/messages/clearChatroom`);
            setMessages([]);
        } catch (error) {
            console.error("Error clearing chatroom:", error);
        }
    };

    const scrollToInput = () => {
        if (inputRef.current) {
            inputRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <Header />
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
                <h2 >Welcome to the chatroom where you can chat with other users</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems:'center', marginTop:'20px'}}>
                <div style={{ width: "80%", marginBottom: "20px", border: '2px solid #333', borderRadius: '10px', padding: '20px', background: '#f0f0f0' }}>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>Chat box </h2>
                        {adminId && (
                        <div style={{ textAlign: 'center', marginBottom: '20px', marginLeft:'20px' }}>
                            <Button variant="dark" onClick={clearChatroom}>Clear Chatroom</Button>
                        </div>
                        )}
                    </div>
                    
                    {messages.length === 0 ? (
                        <p style={{ textAlign: 'center' }}>Messages removed by admin. Please start chatting again.</p>
                    ) : (
                        messages.map((message, index) => (
                            <div key={index} style={{ marginBottom: "10px", display: 'flex', alignItems: 'center' }}>
                                <div style={{ flex: 1 }}>{/*So, flex: 1 is a shorthand for setting flex-grow: 1, flex-shrink: 1, and flex-basis: 0. It essentially tells the flex item to grow and shrink as needed to fill available space along the main axis.*/}
                                    <span style={{ fontWeight: 'bold', color: message.isAdmin ? "blue" : "green" }}>
                                        {message.username} - 
                                    </span>
                                    <span> {message.content}</span>
                                    <span style={{ color: '#999', marginLeft: '15px' }}>
                                        {new Date(message.timestamp).toLocaleTimeString()}, {new Date(message.timestamp).toLocaleDateString()}
                                    </span>
                                </div>
                                {adminId && (
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={(e) => deleteMessage(e, message._id)}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        Delete
                                    </Button>
                                )}
                            </div>
                        ))
                    )}
                </div>

                <form onSubmit={sendMessage} style={{ width: '60%' }}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message..."
                        style={{ width: '100%', marginRight: 'auto', marginLeft: 'auto', borderRadius: '20px', padding: '10px 20px', border: '1px solid #9cc' }}
                    />
                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                        <Button type="submit" variant="success" style={{ borderRadius: '10px', padding: '6px 15px' }}>Send Message</Button>
                        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Chatroom;
