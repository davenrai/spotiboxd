import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Container, Table } from "react-bootstrap";

export default function UserReviews({ userId, setSelectedAlbumId }) {
  const [userReviews, setUserReviews] = useState(null);
  useEffect(() => {
    getUserReviews();
  }, [userId]);

  function getUserReviews() {
    if (!userId) return;
    axios.get(`/reviews?userId=${userId}`, {}).then((res) => {
      if (res.data) {
        setUserReviews(res.data);
      }
    });
  }

  return (
    <div className="my-5">
      <h5>Your Reviews</h5>
      <Container fluid="sm">
        <div style={{ textAlign: "right" }}>
          <button onClick={getUserReviews}>Refresh</button>
        </div>
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
