const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");

// Importation des routes
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const server = http.createServer(app);

// Activation de WebSockets avec `socket.io`
const io = new Server(server, { cors: { origin: "*" } });

// Connexion à MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes API
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("🚀 API de gestion des tâches avec WebSockets fonctionne !");
});

// Gestion des WebSockets
io.on("connection", (socket) => {
  console.log("✅ Un client WebSocket est connecté");

  socket.on("disconnect", () => {
    console.log("❌ Un client WebSocket s'est déconnecté");
  });

  // Recevoir un ajout de tâche et informer tous les clients
  socket.on("task:add", (task) => {
    console.log("📌 Nouvelle tâche ajoutée :", task);
    io.emit("task:added", task);
  });

  // Recevoir une mise à jour de tâche et informer tous les clients
  socket.on("task:update", (task) => {
    console.log("✏️ Tâche mise à jour :", task);
    io.emit("task:updated", task);
  });

  // Recevoir une suppression de tâche et informer tous les clients
  socket.on("task:delete", (taskId) => {
    console.log("🗑️ Tâche supprimée :", taskId);
    io.emit("task:deleted", taskId);
  });
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`)
);
