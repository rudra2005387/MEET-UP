import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, loading, error } = useAuth();
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccess(false);
    const ok = await signup(email, password);
    if (ok) {
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1200);
    } else {
      setFormError("Signup failed. Try a different email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800 text-white">
      <div className="bg-white text-black p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && <div className="text-red-600">{formError}</div>}
          {error && <div className="text-red-600">{error}</div>}
          {success && <div className="text-green-600">Signup successful! Redirecting...</div>}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-700 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;