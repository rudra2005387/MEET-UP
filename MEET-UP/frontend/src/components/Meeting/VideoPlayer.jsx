import React, { useContext } from "react";
import { MeetingContext } from "../context/MeetingContext";

const VideoPlayer = () => {
  const { localStream, remoteStreams } = useContext(MeetingContext);

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <video
        ref={(video) => {
          if (video && localStream) video.srcObject = localStream;
        }}
        autoPlay
        muted
        className="rounded shadow-lg"
      />
      {remoteStreams.map((stream, idx) => (
        <video
          key={idx}
          ref={(video) => {
            if (video && stream) video.srcObject = stream;
          }}
          autoPlay
          // Ensure remote streams are not muted
          className="rounded shadow-lg"
        />
      ))}
    </div>
  );
};

export default VideoPlayer;