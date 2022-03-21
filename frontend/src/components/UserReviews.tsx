import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";

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
    <div>
      <h1>User Reviews</h1>
      {userReviews?.map((review) => (
        <div
          onClick={() => setSelectedAlbumId(review.album_id)}
          key={review.user_id + review.album_id}
        >
          <p>
            {review.album_id} - {review.review}
          </p>
        </div>
      ))}
    </div>
  );
}
