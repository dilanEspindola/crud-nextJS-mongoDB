import Task from "models/Task";
import { dbConnect } from "utils/db";

dbConnect();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const Tasks = await Task.find();
    return res.json(Tasks);
  }

  if (req.method === "POST") {
    createTask(req)
      .then((task) => {
        res.json(task);
      })
      .catch((error) => {
        if (
          error.message ===
          'E11000 duplicate key error collection: tasks.tasks index: title_1 dup key: { title: "learn nextjs" }'
        ) {
          res.status(400).json({ msg: "task already exists" });
        }
        res.status(500).json(error.message);
      });
  }
}

async function getTasks(res) {
  const tasks = await Task.find();
  return res.json(tasks);
}

async function createTask({ body }) {
  const newTask = new Task(body);
  const taskSaved = await newTask.save();
  return taskSaved;
}
