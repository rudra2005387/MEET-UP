import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";

const socket = io("http://localhost:5011");

const VideoRoom = () => {
  const [peers, setPeers] = useState([]);
  const [userStreams, setUserStreams] = useState({});
  const [muted, setMuted] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [myId, setMyId] = useState("");
  const [participants, setParticipants] = useState([]);
  const localVideoRef = useRef();
  const peersRef = useRef([]);
  const localStreamRef = useRef();

  // Helper to add a peer
  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", signal => {
      socket.emit("sending-signal", { userToSignal, callerID, signal });
    });
    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", signal => {
      socket.emit("returning-signal", { signal, callerID });
    });
    peer.signal(incomingSignal);
    return peer;
  }

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      localStreamRef.current = stream;
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;

      socket.emit("join-room", { roomId: "main", username: "User" }); // Replace with real roomId/username if needed

      socket.on("me", id => setMyId(id));

      socket.on("all-users", users => {
        setParticipants([socket.id, ...users.map(u => u.id)]);
        const peersArr = [];
        users.forEach(user => {
          const peer = createPeer(user.id, socket.id, stream);
          peer.on("stream", remoteStream => {
            setUserStreams(prev => ({ ...prev, [user.id]: remoteStream }));
          });
          peersRef.current.push({ peerID: user.id, peer });
          peersArr.push({ peerID: user.id, peer });
        });
        setPeers(peersArr);
      });

      socket.on("user-joined", payload => {
        setParticipants(prev => [...prev, payload.callerID]);
        const peer = addPeer(payload.signal, payload.callerID, stream);
        peer.on("stream", remoteStream => {
          setUserStreams(prev => ({ ...prev, [payload.callerID]: remoteStream }));
        });
        peersRef.current.push({ peerID: payload.callerID, peer });
        setPeers(users => [...users, { peerID: payload.callerID, peer }]);
      });

      socket.on("receiving-returned-signal", payload => {
        const item = peersRef.current.find(p => p.peerID === payload.id);
        if (item) {
          item.peer.signal(payload.signal);
        }
      });

      socket.on("user-left", id => {
        setParticipants(prev => prev.filter(pid => pid !== id));
        const peerObj = peersRef.current.find(p => p.peerID === id);
        if (peerObj) {
          peerObj.peer.destroy();
        }
        peersRef.current = peersRef.current.filter(p => p.peerID !== id);
        setPeers(users => users.filter(p => p.peerID !== id));
        setUserStreams(prev => {
          const copy = { ...prev };
          delete copy[id];
          return copy;
        });
      });
    });

    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
      peersRef.current.forEach(({ peer }) => peer.destroy());
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  // Mute/Unmute
  const handleMute = () => {
    setMuted(m => !m);
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks()[0].enabled = muted;
    }
  };

  // Video On/Off
  const handleVideo = () => {
    setVideoOn(v => !v);
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks()[0].enabled = !videoOn;
    }
  };

  // Leave Meeting
  const handleLeave = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    peersRef.current.forEach(({ peer }) => peer.destroy());
    socket.disconnect();
    window.location.reload();
  };

  // --- Screen Sharing Logic ---
  const handleShareScreen = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const screenTrack = screenStream.getVideoTracks()[0];

      // Replace video track in all peers
      peersRef.current.forEach(({ peer }) => {
        const sender = peer._pc.getSenders().find(s => s.track && s.track.kind === "video");
        if (sender) sender.replaceTrack(screenTrack);
      });

      // Show screen in local video
      if (localVideoRef.current) localVideoRef.current.srcObject = screenStream;

      // When screen sharing stops, revert to camera
      screenTrack.onended = async () => {
        const camStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const camTrack = camStream.getVideoTracks()[0];
        peersRef.current.forEach(({ peer }) => {
          const sender = peer._pc.getSenders().find(s => s.track && s.track.kind === "video");
          if (sender) sender.replaceTrack(camTrack);
        });
        if (localVideoRef.current) localVideoRef.current.srcObject = camStream;
        localStreamRef.current = camStream;
      };
    } catch (err) {
      alert("Screen sharing failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h2 className="text-2xl font-bold mb-4">Meeting Room</h2>
      <div className="flex flex-wrap gap-6 justify-center mb-6">
        {/* Local video */}
        <div className="flex flex-col items-center">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            className="w-64 h-48 bg-black rounded mb-2"
          />
          <span className="font-semibold">You ({myId.slice(-5)})</span>
        </div>
        {/* Remote videos */}
        {peers.map(({ peerID }) => (
          <div key={peerID} className="flex flex-col items-center">
            <VideoTile stream={userStreams[peerID]} />
            <span className="font-semibold">User {peerID.slice(-5)}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleMute}
          className={`px-4 py-2 rounded ${muted ? "bg-red-500" : "bg-blue-500"} text-white`}
        >
          {muted ? "Unmute" : "Mute"}
        </button>
        <button
          onClick={handleVideo}
          className={`px-4 py-2 rounded ${videoOn ? "bg-green-500" : "bg-gray-500"} text-white`}
        >
          {videoOn ? "Video Off" : "Video On"}
        </button>
        <button
          onClick={handleShareScreen}
          className="px-4 py-2 rounded bg-yellow-600 text-white"
        >
          Share Screen
        </button>
        <button
          onClick={handleLeave}
          className="px-4 py-2 rounded bg-gray-700 text-white"
        >
          Leave Meeting
        </button>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Participants:</h3>
        <ul>
          {participants.map(pid => (
            <li key={pid}>{pid === myId ? "You" : `User ${pid.slice(-5)}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Helper component for remote video tiles
function VideoTile({ stream }) {
  const ref = useRef();
  useEffect(() => {
    if (ref.current && stream) {
      ref.current.srcObject = stream;
    }
  }, [stream]);
  return <video ref={ref} autoPlay className="w-64 h-48 bg-black rounded mb-2" />;
}

export default VideoRoom;