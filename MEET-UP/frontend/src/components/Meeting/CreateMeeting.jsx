import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const CreateMeeting = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    const roomId = uuidv4();
    navigate(`/room/${roomId}`);
  };

  return (
    <div>
      <h2>Create a Meeting</h2>
      <button onClick={handleCreate}>Start Meeting</button>
    </div>
  );
};

export default CreateMeeting;
