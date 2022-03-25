import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, ListGroup, Table } from "react-bootstrap";

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
      <h1>
        <u>Your Reviews</u>
      </h1>
      <Container fluid="sm">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Artist</th>
              <th>Album</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {userReviews?.map((review) => (
              <tr
                key={review.user_id + review.album_id}
                onClick={() => setSelectedAlbumId(review.album_id)}
              >
                <td>{review.artist}</td>
                <td>{review.album_title}</td>
                <td>{review.review}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
