console.log("Home component rendered");
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">
        Welcome to <span className="text-yellow-400">MeetUp</span>
      </h1>
      <p className="text-xl md:text-2xl mb-8 text-center max-w-xl">
        A real-time video meeting platform built with WebRTC, Socket.IO & MERN.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/create")}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg transition"
        >
          Create Meeting
        </button>
        <button
          onClick={() => navigate("/join")}
          className="bg-transparent border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          Join Meeting
        </button>
      </div>
    </div>
  );
};

export default Home;
