import Image from "next/image";
import { useRouter } from "next/router";
import { Menu, Container, Button } from "semantic-ui-react";

export const NavBar = () => {
  const router = useRouter();
  return (
    <Menu inverted borderless attached>
      <Container>
        <Menu.Item>
          <Image
            src="/favicon.ico"
            width={30}
            height={30}
            alt="image"
            onClick={() => router.push("/")}
          />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Button
              primary
              size="mini"
              onClick={() => router.push("/tasks/new")}
            >
              New task
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
