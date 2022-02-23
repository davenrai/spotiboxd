import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export default function Nav({ avatar, name }) {
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
          <Navbar.Text>
            <a href="#">{name}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
