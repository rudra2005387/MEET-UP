import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const Chat = ({ meetingId }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const socket = io('http://localhost:5000'); // Adjust the URL as needed

    useEffect(() => {
        socket.emit('joinRoom', meetingId);

        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.emit('leaveRoom', meetingId);
            socket.off();
        };
    }, [meetingId, socket]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit('sendMessage', { meetingId, message });
            setMessage('');
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        {msg}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;