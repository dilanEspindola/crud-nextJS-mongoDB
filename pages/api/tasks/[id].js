import Task from "models/Task";
import { dbConnect } from "utils/db";

dbConnect();

export default function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    getTask(id)
      .then((task) => {
        if (!task) return res.status(404).json({ msg: "tarea no encontrada" });
        res.status(200).json(task);
      })
      .catch((error) => res.status(500).json({ msg: error.message }));
  }

  if (req.method === "PUT") {
    updateTask(id, req)
      .then((task) => res.json({ task, msg: "tarea actualizada" }))
      .catch((error) => res.status(500).json(error));
  }

  if (req.method === "DELETE") {
    deleteTask(id).then((task) => {
      if (!task) {
        res.status(404).json({ msg: "tarea no encontrada" });
      }
      res.json({ msg: "tarea eliminada" });
    });
  }
}

async function getTask(id) {
  const task = await Task.findById(id);
  return task;
}

async function updateTask(id, { body }) {
  const taskUpdated = await Task.findByIdAndUpdate(id, body, { new: true });
  return taskUpdated;
}

async function deleteTask(id) {
  const deleteTask = await Task.findByIdAndDelete(id);
  return deleteTask;
}
