import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, CardGroup, Form } from "react-bootstrap";

export default function AlbumDetails({ id, images, tracks, artists, userId }) {
  const [albumReview, setAlbumReview] = useState(null);

  useEffect(() => {
    setAlbumReview(null);
    axios
      .get(`http://localhost:4000/review?user=${userId}&album=${id}`)
      .then((res) => {
        let review = res.data[0]?.review;
        console.log(review);
        if (review) setAlbumReview(review);
      });
  }, [id]);

  function handleReviewSubmit(e) {
    console.log(e.target.value);
  }

  return (
    <div>
      <CardGroup>
        <Card style={{ width: "20rem", backgroundColor: "black" }}>
          <Card.Img style={{ width: "350px" }} src={images[1].url}></Card.Img>
        </Card>
        <Card
          className="justify-content-center"
          style={{ backgroundColor: "black" }}
        >
          {tracks.items.map((track) => {
            return (
              <div key={track.id}>
                {track.track_number} - {track.name}
              </div>
            );
          })}
        </Card>
        <Card
          className="justify-content-center"
          style={{ backgroundColor: "black", height: "fit-content" }}
        >
          <Form.Group controlId="form.Textarea" style={{ height: "90%" }}>
            <Form.Label>Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              type="review"
              placeholder={albumReview ? albumReview : "Enter review here.."}
            />
          </Form.Group>
          <Button
            size="lg"
            variant="secondary"
            onClick={(e) => handleReviewSubmit(e)}
          >
            Submit
          </Button>
        </Card>
      </CardGroup>
    </div>
  );
}
