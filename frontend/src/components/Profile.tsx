import { Col, Container, Row } from "react-bootstrap";

export default function Profile({ userDetails }) {
  const {
    display_name: displayName,
    email,
    id,
    images: profileImg,
    country,
    followers,
  } = userDetails;
  return (
    <Container className="d-flex flex-column py-5">
      <Row>
        <Col>
          <img
            src={profileImg[0].url ?? null}
            style={{ width: "200px" }}
            alt="profile"
          ></img>
        </Col>
        <Col style={{ textAlign: "left", margin: "auto" }}>
          <div>{displayName}</div>
          <div> {email}</div>
          <div>{id}</div>
          <div>Followers: {followers ? followers.total : "loading..."}</div>
          <div>{country}</div>
        </Col>
      </Row>
    </Container>
  );
}
