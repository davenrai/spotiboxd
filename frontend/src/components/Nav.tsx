import React from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export default function Nav({ avatar, name }) {
  function handleLogout() {
    window.localStorage.removeItem("auth");
    window.location.reload();
  }
  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Container>
        {/* <Navbar.Brand href="/">
          <img
            alt=""
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          
        </Navbar.Brand> */}
        Spotiboxd
        <Navbar.Collapse className="justify-content-end">
          {avatar ? (
            <img
              src={avatar}
              style={{
                width: "50px",
                marginRight: "10px",
                borderRadius: "50%",
              }}
            ></img>
          ) : (
            []
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
