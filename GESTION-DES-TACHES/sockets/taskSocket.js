module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 Un utilisateur s'est connecté au WebSocket");

    socket.on("disconnect", () => {
      console.log("🔴 Un utilisateur s'est déconnecté");
    });

    // Recevoir un nouvel ajout de tâche et notifier tous les clients
    socket.on("task:add", (task) => {
      io.emit("task:added", task);
    });

    // Recevoir une mise à jour de tâche et notifier tous les clients
    socket.on("task:update", (task) => {
      io.emit("task:updated", task);
    });

    // Recevoir une suppression de tâche et notifier tous les clients
    socket.on("task:delete", (taskId) => {
      io.emit("task:deleted", taskId);
    });
  });
};
