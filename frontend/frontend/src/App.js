import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import VideoRoom from './components/Meeting/VideoRoom';
import Chat from './components/Meeting/Chat';
import Controls from './components/Meeting/Controls';
import CreateMeeting from "./components/Meeting/CreateMeeting";
import JoinMeeting from "./components/Meeting/JoinMeeting";
import { AuthProvider } from './context/AuthContext.js';
import { MeetingProvider } from './components/Meeting/MeetingContext.jsx';

function App() {
  return (
    <AuthProvider>
      <MeetingProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/meeting/:id" element={<VideoRoom />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/controls" element={<Controls />} />
            <Route path="/create" element={<CreateMeeting />} />
            <Route path="/join" element={<JoinMeeting />} />
            <Route path="/room" element={<VideoRoom />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </Router>
      </MeetingProvider>
    </AuthProvider>
  );
}

export default App;