import React from "react";
import VideoPlayer from "./VideoPlayer";
import MeetingControls from "./MeetingControls";
import ChatBox from "./ChatBox";
import ParticipantsList from "./ParticipantsList";

const MeetingRoom = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="flex-1 flex flex-col">
        <VideoPlayer />
        <MeetingControls />
      </div>
      <div className="w-1/4 border-l border-gray-700">
        <ChatBox />
        <ParticipantsList />
      </div>
    </div>
  );
};

export default MeetingRoom;
