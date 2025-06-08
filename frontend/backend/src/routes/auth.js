const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const JWT_SECRET = "your_secret_key"; // Use env variable in production

// In-memory user store (replace with DB in real app)
const users = [];

// Signup route
router.post("/signup", (req, res) => {
  const { email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = { email, password }; // Hash password in real app!
  users.push(user);
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ user: { email }, token });
});

// Login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ user: { email }, token });
});

// Protected route example
router.get("/me", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ user: { email: decoded.email } });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;