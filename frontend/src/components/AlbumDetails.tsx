import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, CardGroup, Form } from "react-bootstrap";

export default function AlbumDetails({ id, images, tracks, artists, userId }) {
  const [albumReview, setAlbumReview] = useState<string>("");
  const [uploadMessage, setUploadMessage] = useState<string>("");

  useEffect(() => {
    setAlbumReview("");
    setUploadMessage("");
    axios
      .get(`http://localhost:4000/review?user=${userId}&album=${id}`)
      .then((res) => {
        let review = res.data[0]?.review;
        console.log(review);
        if (review) setAlbumReview(review);
      });
  }, [id]);

  function handleReviewSubmit(e) {
    // send if albumReview to server
    // setAlbumReview(null)
    try {
      if (albumReview) {
        axios
          .post("http://localhost:4000/review", {
            id: userId,
            albumId: id,
            review: albumReview,
          })
          .then((res) => {
            setUploadMessage("Review saved.");
          });
      }
    } catch {
      setUploadMessage("Failure");
    }
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
            <Form.Label>Your Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              type="review"
              placeholder={albumReview ?? "Enter review here.."}
              onChange={(e) => setAlbumReview(e.target.value)}
              value={albumReview}
            />
          </Form.Group>
          <Button
            size="lg"
            variant="secondary"
            onClick={(e) => handleReviewSubmit(e)}
          >
            Submit
          </Button>
          <Form.Text className="text-muted">{uploadMessage}</Form.Text>
        </Card>
      </CardGroup>
    </div>
  );
}
