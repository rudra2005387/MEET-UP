import React, { useContext } from "react";
import { MeetingContext } from "../context/MeetingContext";

const ParticipantsList = () => {
  const { participants } = useContext(MeetingContext);

  return (
    <div className="h-1/2 border-t border-gray-700 p-2">
      <h3 className="text-lg font-semibold mb-2">Participants</h3>
      <ul>
        {participants.map((p, idx) => (
          <li key={idx}>
            {p.name} {p.micOn ? "🎤" : "🔇"} {p.camOn ? "📹" : "📷"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantsList;
