import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinMeeting = () => {
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roomId.trim()) {
      setError("Please enter a Room ID.");
      return;
    }
    setError("");
    navigate(`/room/${roomId.trim()}`);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md flex flex-col items-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Join a Meeting</h2>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="mb-4 px-4 py-2 border rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Join
        </button>
      </form>
    </div>
  );
};

export default JoinMeeting;