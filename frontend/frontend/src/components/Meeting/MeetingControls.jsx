import React, { useContext } from "react";
import { MeetingContext } from "../context/MeetingContext";
import { Mic, MicOff, Video, VideoOff, ScreenShare, PhoneOff } from "lucide-react";

const MeetingControls = () => {
  const {
    toggleMic,
    toggleCamera,
    leaveMeeting,
    isMicOn,
    isCameraOn,
    startScreenShare
  } = useContext(MeetingContext);

  return (
    <div className="flex justify-center p-4 gap-4 bg-black bg-opacity-60 rounded-lg">
      <button onClick={toggleMic}>
        {isMicOn ? <Mic /> : <MicOff />}
      </button>
      <button onClick={toggleCamera}>
        {isCameraOn ? <Video /> : <VideoOff />}
      </button>
      <button onClick={startScreenShare}>
        <ScreenShare />
      </button>
      <button onClick={leaveMeeting} className="bg-red-600 rounded-full p-2">
        <PhoneOff />
      </button>
    </div>
  );
};

export default MeetingControls;