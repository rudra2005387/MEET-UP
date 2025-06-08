import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, password) => {
    const res = await axios.post("http://localhost:5011/api/auth/login", { email, password });
    setUser({ email: res.data.email, token: res.data.token });
    localStorage.setItem("user", JSON.stringify({ email: res.data.email, token: res.data.token }));
  };

  const signup = async (email, password) => {
    await axios.post("http://localhost:5011/api/auth/signup", { email, password });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);