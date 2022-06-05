import { useState, useEffect } from "react";
import { Button, Form, Grid } from "semantic-ui-react";
import { useRouter } from "next/router";

export default function NewTask() {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validate = () => {
    const errors = {};

    if (newTask.title === "") errors.title = "Title is required";
    if (newTask.description === "")
      errors.description = "Description is required";

    return errors;
  };

  const handleChange = ({ target }) => {
    setNewTask({
      ...newTask,
      [target.name]: target.value,
    });
  };

  const getTaks = async () => {
    const res = await fetch(
      `http://localhost:3000/api/tasks/${router.query.id}`
    );
    const task = await res.json();
    setNewTask({
      ...task,
      title: task.title,
      description: task.description,
    });
  };

  useEffect(() => {
    if (router.query.id) {
      getTaks();
    }
  }, [router.query.id]);

  const createTask = async (task) => {
    try {
      await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async () => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${router.query.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();

    if (Object.keys(errors).length) setErrors(errors);

    if (router.query.id) {
      await updateTask();
    } else {
      await createTask(newTask);
    }

    router.push("/");
  };

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="3"
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column>
          <h1>{router.query.id ? "Edit Task" : "Create a Task"}</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              label="Title"
              placeholder="Title"
              onChange={handleChange}
              name="title"
              error={
                errors.title
                  ? { content: errors.title, pointing: "below" }
                  : null
              }
              value={newTask.title}
            />
            <Form.TextArea
              label="Description"
              placeholder="Description"
              onChange={handleChange}
              name="description"
              error={
                errors.description
                  ? { content: errors.description, pointing: "below" }
                  : null
              }
              value={newTask.description}
            />
            <Button primary>
              {router.query.id ? "Edit Task" : "Save Task"}
            </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
