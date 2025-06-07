import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { MeetingProvider } from "./context/MeetingContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <MeetingProvider>
        <App />
      </MeetingProvider>
    </AuthProvider>
  </React.StrictMode>
);