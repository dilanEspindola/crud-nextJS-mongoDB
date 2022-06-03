import { useRouter } from "next/router";
import Image from "next/image";
import { Container, Button, Card, Grid, Header } from "semantic-ui-react";

export default function Home({ tasks }) {
  const router = useRouter();

  if (tasks.length === 0)
    return (
      <Grid
        centered
        verticalAlign="middle"
        columns="1"
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Header as="h1">There are no tasks yet</Header>
            <Image
              src="https://cdn.iconscout.com/icon/free/png-256/data-not-found-1965034-1662569.png"
              width={70}
              height={70}
              alt="No tasks"
            />
            <div>
              <Button primary>Create a new task</Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );

  return (
    <Container style={{ padding: "20px" }}>
      <Card.Group itemsPerRow={4} px>
        {tasks.map((task) => (
          <Card key={task._id}>
            <Card.Content>
              <Card.Header>{task.title}</Card.Header>
              <Card.Description>{task.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button primary onClick={() => router.push(`/tasks/${task._id}`)}>
                View
              </Button>
              <Button secondary>Edit</Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/tasks");
  const data = await res.json();

  return {
    props: { tasks: data },
  };
};
