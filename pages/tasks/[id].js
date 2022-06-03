import { useState } from "react";
import Error from "next/error";
import { useRouter } from "next/router";
import { Grid, Button, Confirm, Loader } from "semantic-ui-react";

export default function TaskDetail({ task, error }) {
  const [isOpen, setisOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { query, push } = useRouter();

  const deleteTask = async () => {
    const { id } = query;
    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const open = () => {
    setisOpen(true);
  };

  const close = () => {
    setisOpen(false);
  };

  const handleDelete = () => {
    setLoading(true);
    deleteTask();
    // setLoading(false);
    close();
    push("/");
  };

  if (error && error.status)
    return <Error statusCode={404} title={error.statusText} />;

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="3"
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <div>
            <Button color="red" onClick={open} loading={loading}>
              Delete
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Confirm
        open={isOpen}
        onConfirm={handleDelete}
        onCancel={close}
        header="Are you sure?"
        content="This will delete the task and all its subtasks"
      />
    </Grid>
  );
}

export const getServerSideProps = async ({ query }) => {
  const res = await fetch(`http://localhost:3000/api/tasks/${query.id}`);

  if (res.status === 200) {
    const data = await res.json();
    return {
      props: { task: data },
    };
  }

  return {
    props: { error: { status: res.status, statusText: res.statusText } },
  };
};
