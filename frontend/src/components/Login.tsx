import React from "react";
import { Container } from "react-bootstrap";

const LOGIN_URI =
  process.env.NODE_ENV === "production"
    ? "https://spotiboxd.herokuapp.com/"
    : "http://localhost:4000";

export default function Login() {
  return (
    <Container
      className="justify-content-center align-items-center m-auto"
      style={{ position: "relative", top: "30%" }}
    >
      <h1>Welcome to Spotiboxd</h1>
      <div>
        <img></img>
        <a className="btn btn-success btn-lg" href={`${LOGIN_URI}/login`}>
          Login with Spotify!
        </a>
      </div>
    </Container>
  );
}
