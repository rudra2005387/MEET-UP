import React from 'react';

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to MEET-UP</h1>
            <p>Your one-stop solution for seamless video meetings.</p>
            <div className="features">
                <h2>Features:</h2>
                <ul>
                    <li>User Authentication</li>
                    <li>Create/Join Meeting Rooms</li>
                    <li>Real-time Video/Audio Communication</li>
                    <li>In-Meeting Chat</li>
                    <li>User Presence and Controls</li>
                </ul>
            </div>
            <div className="cta">
                <h2>Get Started</h2>
                <p>Sign up or log in to start your meeting experience!</p>
            </div>
        </div>
    );
};

export default Home;