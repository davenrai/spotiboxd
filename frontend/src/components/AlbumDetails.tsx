import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, CardGroup, Form, Row, Table } from "react-bootstrap";

export default function AlbumDetails({
  id,
  images,
  tracks,
  title,
  artists,
  userId,
}) {
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
    try {
      if (albumReview) {
        axios
          .post("http://localhost:4000/review", {
            id: userId,
            albumId: id,
            review: albumReview,
            title: title,
            artist: artists[0].name ?? null,
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
        <Card
          className="m-2"
          style={{
            width: "20rem",
            backgroundColor: "black",
            textAlign: "left",
          }}
        >
          <h2>{artists.map((artist) => artist.name).join(", ")}</h2>
          <h4>{title}</h4>
          <Card.Img style={{ width: "350px" }} src={images[1].url}></Card.Img>
        </Card>
        <Card
          className="justify-content-center m-2 p-2"
          style={{ backgroundColor: "black" }}
        >
          {/* {tracks.items.map((track) => {
            return (
              <div key={track.id}>
                {track.track_number} - {track.name}
              </div>
            );
          })} */}
          <Table bordered variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {tracks.items.map((track, index) => (
                // <div key={track.id}>
                //   {track.track_number} - {track.name}
                // </div>
                <tr key={track.id}>
                  <td>{track.track_number}</td>
                  <td>{track.name}</td>
                </tr>
              ))}
              {/* {userReviews?.map((review) => (
              <tr
                key={review.user_id + review.album_id}
                onClick={() => setSelectedAlbumId(review.album_id)}
              >
                <td>{review.artist}</td>
                <td>{review.album_title}</td>
                <td>{review.review}</td>
              </tr>
            ))} */}
            </tbody>
          </Table>
        </Card>
        <Card
          className="justify-content-center m-2"
          style={{ backgroundColor: "black", height: "fit-content" }}
        >
          <Form.Group controlId="form.Textarea" style={{ height: "90%" }}>
            <Form.Label>
              <h3>Your Review</h3>
            </Form.Label>
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
