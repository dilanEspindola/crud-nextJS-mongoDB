import { useState } from "react";
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

  const createTask = async (task) => {
    try {
      await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = validate();

    if (Object.keys(errors).length) setErrors(errors);

    createTask(newTask);
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
          <h1>Create a Task</h1>
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
            />
            <Button primary>Save Task</Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
