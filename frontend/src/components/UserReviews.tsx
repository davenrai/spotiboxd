import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";

export default function UserReviews({ userId, setSelectedAlbumId }) {
  // make a call to db to get all ids of reviews from the user.
  // display a mini album detail of each.
  const [userReviews, setUserReviews] = useState(null);
  useEffect(() => {
    if (!userId) return;
    axios
      .get(`http://localhost:4000/reviews?userId=${userId}`)
      .then((res) => setUserReviews(res.data));
  }, [userId]);
  return (
    <div className="my-5">
      <h1>Your Reviews</h1>
      <Container fluid="sm">
        <ListGroup>
          {userReviews?.map((review) => (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start bg-dark"
              onClick={() => setSelectedAlbumId(review.album_id)}
              key={review.user_id + review.album_id}
              style={{ textAlign: "left", color: "white" }}
            >
              <p>
                {review.album_title} - {review.review}
              </p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
}
