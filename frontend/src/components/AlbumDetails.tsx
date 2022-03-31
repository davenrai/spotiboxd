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
  const [trackRatings, setTrackRatings] = useState<number[]>([]);
  const [uploadMessage, setUploadMessage] = useState<string>("");
  const [ratingSavedMessage, setRatingSavedMessage] = useState<string>("");

  useEffect(() => {
    setAlbumReview("");
    setUploadMessage("");
    setRatingSavedMessage("");
    axios.get(`/review?user=${userId}&album=${id}`).then((res) => {
      let review = res.data[0]?.review;
      let track_ratings = res.data[0]?.track_ratings;
      if (review) setAlbumReview(review);
      if (track_ratings) {
        console.log(track_ratings);
        setTrackRatings(track_ratings.split(","));
      } else {
        setTrackRatings(new Array(tracks?.items.length).fill(0));
      }
    });
  }, [id]);

  function handleReviewSubmit(e) {
    try {
      if (albumReview) {
        axios
          .post("/review", {
            id: userId,
            albumId: id,
            review: albumReview,
            title: title,
            artist: artists[0].name ?? null,
          })
          .then((res) => {
            setRatingSavedMessage("");
            setUploadMessage("Review saved.");
          });
      }
    } catch {
      setUploadMessage("Failure");
    }
  }

  function handleRatingSubmit() {
    try {
      axios
        .post("/rating", {
          id: userId,
          albumId: id,
          title: title,
          artist: artists[0].name ?? null,
          ratings: trackRatings.join(","),
        })
        .then((res) => {
          setUploadMessage("");
          setRatingSavedMessage("Ratings Saved.");
        });
    } catch {
      console.log("failure");
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
          <Card.Img
            className="img-fluid"
            style={{ width: "300px" }}
            src={images[1].url}
          ></Card.Img>
          <p>
            Review (Based on Track Ratings) :{" "}
            {trackRatings
              ? (
                  trackRatings?.reduce(
                    (prevVal, currValue) => Number(prevVal) + Number(currValue),
                    0
                  ) / trackRatings?.length
                ).toFixed(1)
              : "N/A"}
          </p>
          <hr />
          <Card
            className="justify-content-center bg-black"
            style={{ height: "fit-content" }}
          >
            <Form.Group controlId="form.Textarea">
              <Form.Label>
                <h5>Review</h5>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                type="review"
                placeholder={
                  albumReview !== "" ? albumReview : "Enter review here.."
                }
                onChange={(e) => setAlbumReview(e.target.value)}
                value={albumReview}
              />
            </Form.Group>
            <Button
              size="sm"
              variant="secondary"
              onClick={(e) => handleReviewSubmit(e)}
            >
              Submit
            </Button>
            <Form.Text className="text-muted">{uploadMessage}</Form.Text>
          </Card>
        </Card>
        <Card className="m-2" style={{ backgroundColor: "black" }}>
          <Table bordered variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Track Rating</th>
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
                  <td>
                    <select
                      className="form-select form-select-md"
                      aria-label=".form-select-sm example"
                      value={trackRatings[index]}
                      onChange={(e) => {
                        setTrackRatings(
                          trackRatings.map((value, i) =>
                            i === index ? parseInt(e.target.value) : value
                          )
                        );
                      }}
                    >
                      <option defaultValue={0}>Rating</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button className="btn-secondary" onClick={handleRatingSubmit}>
            Save
          </Button>
          <p className="text-muted">{ratingSavedMessage}</p>
        </Card>
      </CardGroup>
    </div>
  );
}
