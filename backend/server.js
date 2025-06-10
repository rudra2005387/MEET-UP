const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const authRoutes = require("./routes/authRoutes");

const sequelize = require("./utils/db");

const app = express();
const server = http.createServer(app);

// --- CORS and JSON middleware ---
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "https://your-frontend.onrender.com"
  ],
  credentials: true
}));
app.use(express.json());

// --- Health check route ---
app.get("/", (req, res) => {
  res.status(200).send("Server is healthy!");
});

// --- Auth routes ---
app.use("/api/auth", authRoutes);

// --- Socket.IO setup ---
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002"
    ],
    methods: ["GET", "POST"]
  }
});

const usersInRoom = {};

io.on("connection", (socket) => {
  socket.on("join-room", ({ roomId, username }) => {
    if (!usersInRoom[roomId]) usersInRoom[roomId] = [];
    usersInRoom[roomId].push({ id: socket.id, username });

    const otherUsers = usersInRoom[roomId].filter(u => u.id !== socket.id);
    socket.emit("all-users", otherUsers);

    socket.on("sending-signal", (payload) => {
      io.to(payload.userToSignal).emit("user-joined", {
        signal: payload.signal,
        callerID: payload.callerID,
        username
      });
    });

    socket.on("returning-signal", (payload) => {
      io.to(payload.callerID).emit("receiving-returned-signal", {
        signal: payload.signal,
        id: socket.id,
        username
      });
    });

    socket.on("disconnect", () => {
      if (usersInRoom[roomId]) {
        usersInRoom[roomId] = usersInRoom[roomId].filter(u => u.id !== socket.id);
        socket.to(roomId).emit("user-left", socket.id);
        if (usersInRoom[roomId].length === 0) delete usersInRoom[roomId];
      }
    });
  });
});

// Ensure use of Render's dynamic port
const PORT = process.env.PORT || 5011;

const startServer = async () => {
  try {
    console.log("⏳ Connecting to database...");
    await sequelize.authenticate();
    console.log("✅ Database connection established");

    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync({ alter: true });
      console.log("✅ Database models synchronized");
    }

    // Start listening ASAP to avoid Render timeout
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();