import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

type NavProps = {
  avatar: string;
  name: string;
};

export default function Nav({ avatar, name }: NavProps) {
  function handleLogout(): void {
    window.localStorage.removeItem("auth");
    window.location.reload();
  }
  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Container>
        Spotiboxd
        <Navbar.Collapse className="justify-content-end">
          {avatar && (
            <img
              src={avatar}
              style={{
                width: "50px",
                marginRight: "10px",
                borderRadius: "50%",
              }}
            ></img>
          )}
          <Navbar.Text>{name}</Navbar.Text>
          {name && (
            <Button variant="danger" className="m-2" onClick={handleLogout}>
              Log out
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
