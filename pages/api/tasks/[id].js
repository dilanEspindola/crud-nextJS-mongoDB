import Task from "models/Task";
import { dbConnect } from "utils/db";

dbConnect();

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      const task = await Task.findById(id);
      if (!task) return res.status(404).json({ msg: "task not found" });
      return res.json(task);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  if (req.method === "PUT") {
    try {
      const task = await Task.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!task) return res.status(404).json({ msg: "Task does not exists" });
      return res.status(200).json(task);
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
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

// async function getTask(id) {
//   const task = await Task.findById(id);
//   return task;
// }

// async function updateTask(id, { body }) {
//   const taskUpdated = await Task.findByIdAndUpdate(id, body, { new: true });
//   return taskUpdated;
// }

async function deleteTask(id) {
  const deleteTask = await Task.findByIdAndDelete(id);
  return deleteTask;
}
