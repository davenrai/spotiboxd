import React from "react";
import { Card, CardGroup } from "react-bootstrap";

export default function AlbumDetails({ id, images, tracks, artists }) {
  console.log(images);
  return (
    <div>
      <CardGroup>
        <Card style={{ width: "20rem", backgroundColor: "black" }}>
          <Card.Img src={images[1].url}></Card.Img>
          TRACK 1
        </Card>
        <Card style={{ backgroundColor: "black" }}>
          {tracks.items.map((track) => {
            console.log(track);
            return (
              <div key={track.id}>
                {track.track_number} - {track.name}
              </div>
            );
          })}
        </Card>
        <Card.Text>{artists[0].name}</Card.Text>
      </CardGroup>
    </div>
  );
}
