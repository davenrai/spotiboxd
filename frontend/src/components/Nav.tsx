import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export default function Nav() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
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
      </Container>
    </Navbar>
  );
}
