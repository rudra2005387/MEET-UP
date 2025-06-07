import React, { createContext, useState, useContext } from "react";

// Create the context
export const MeetingContext = createContext();

// Provider component
export const MeetingProvider = ({ children }) => {
  // Example state, add your own logic as needed
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [messages, setMessages] = useState([]);

  // Example sendMessage function
  const sendMessage = (msg) => {
    setMessages((prev) => [...prev, { sender: "Me", text: msg }]);
    // Add your socket logic here
  };

  // Example toggles (replace with your real logic)
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const toggleMic = () => setIsMicOn((v) => !v);
  const toggleCamera = () => setIsCameraOn((v) => !v);
  const leaveMeeting = () => {};
  const startScreenShare = () => {};

  return (
    <MeetingContext.Provider
      value={{
        localStream,
        setLocalStream,
        remoteStreams,
        setRemoteStreams,
        messages,
        sendMessage,
        isMicOn,
        isCameraOn,
        toggleMic,
        toggleCamera,
        leaveMeeting,
        startScreenShare,
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};

// Optional: custom hook for easier usage
export const useMeeting = () => useContext(MeetingContext);