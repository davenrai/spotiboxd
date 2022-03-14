import React from "react";
import { Container } from "react-bootstrap";

export default function Login() {
  return (
    <Container
      className="justify-content-center align-items-center m-auto"
      style={{ position: "relative", top: "30%" }}
    >
      <h1>Welcome to Spotiboxd</h1>
      <div>
        <img></img>
        <a
          className="btn btn-success btn-lg"
          href={"http://localhost:4000/login"}
        >
          Login with Spotify!
        </a>
      </div>
    </Container>
  );
}
