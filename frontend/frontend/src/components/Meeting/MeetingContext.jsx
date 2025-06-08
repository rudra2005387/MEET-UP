import React, { createContext, useEffect, useRef, useState } from "react";

// Create Context
export const MeetingContext = createContext();

// Provider Component
export const MeetingProvider = ({ children }) => {
  // Local media stream (mic+cam)
  const [localStream, setLocalStream] = useState(null);
  
  // List of remote media streams (from other users)
  const [remoteStreams, setRemoteStreams] = useState([]);
  
  
  const [participants, setParticipants] = useState([]);

  // Chat messages
  const [chatMessages, setChatMessages] = useState([]);

  // State flags
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const localVideoRef = useRef(null);

  // 🔌 Get user media
  useEffect(() => {
    const initLocalMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Failed to get local media:", err);
      }
    };

    initLocalMedia();
  }, []);

  // 🎙️ Toggle mic
  const toggleMic = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMicOn((prev) => !prev);
    }
  };

  // 📷 Toggle camera
  const toggleCamera = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsCameraOn((prev) => !prev);
    }
  };

  // 🖥️ Placeholder: Start screen sharing
  const startScreenShare = () => {
    // To be implemented with WebRTC
    console.log("Screen sharing started (placeholder)");
    setIsScreenSharing(true);
  };

  // 💬 Send a chat message
  const sendMessage = (msg) => {
    if (!msg.trim()) return;
    const message = {
      user: "You",
      text: msg,
      timestamp: new Date().toLocaleTimeString(),
    };
    setChatMessages((prev) => [...prev, message]);
    // Emit via socket (to be added)
  };

  // 🔚 Leave meeting
  const leaveMeeting = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    window.location.href = "/"; // Redirect to home/login
  };

  return (
    <MeetingContext.Provider
      value={{
        localStream,
        remoteStreams,
        setRemoteStreams,
        participants,
        setParticipants,
        chatMessages,
        sendMessage,
        toggleMic,
        toggleCamera,
        isMicOn,
        isCameraOn,
        leaveMeeting,
        startScreenShare,
        localVideoRef,
        isScreenSharing
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};


