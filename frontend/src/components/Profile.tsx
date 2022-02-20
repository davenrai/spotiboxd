import React from "react";
import { Container, Row } from "react-bootstrap";

export default function Profile({ userDetails }) {
  const { displayName, email, id, profileImg } = userDetails;
  return (
    <Container className="d-flex flex-column py-2">
      <Row>
        <img
          src={profileImg ?? null}
          className="rounded"
          style={{ width: "200px", borderRadius: "70%" }}
          alt="profile"
        ></img>
        Profile - {displayName} - {email}
      </Row>
    </Container>
  );
}
