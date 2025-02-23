const express = require("express");
const {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.get("/", getTasks); // Récupérer toutes les tâches
router.post("/", addTask); // Ajouter une nouvelle tâche
router.put("/:id", updateTask); // Modifier une tâche
router.delete("/:id", deleteTask); // Supprimer une tâche

module.exports = router;
