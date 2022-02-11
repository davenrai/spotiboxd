import React from "react";
import { Container } from "react-bootstrap";

export default function Login() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <a
        className="btn btn-success btn-lg"
        href={"http://localhost:4000/login"}
      >
        Login with Spotify!
      </a>
    </Container>
  );
}
