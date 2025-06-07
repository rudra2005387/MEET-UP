import React, { useState, useContext } from "react";
import { MeetingContext } from "../context/MeetingContext";

const ChatBox = () => {
  const { messages, sendMessage } = useContext(MeetingContext);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded shadow p-4">
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-1">
            <span className="font-semibold">{msg.sender}: </span>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded px-2 py-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-1"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;