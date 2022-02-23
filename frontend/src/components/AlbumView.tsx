import React, { useEffect, useState, useContext } from "react";
import { Container, Stack } from "react-bootstrap";

export default function AlbumView({ api: spotifyApi }) {
  const [userSavedAlbums, setUserSavedAlbums] = useState<any>(null);
  // pass auth here as props so it's not happening in dashboard.
  // use UseEffect to call user's saved albums

  // Add a search bar to allow a user to search for an album.
  // as default, show the user's saved albums (kinda as a starter)
  // From there each album should have it's own component which lists
  // it's songs (and its details), copyright, etc. (Maybe even include a player?)
  useEffect(() => {
    if (!spotifyApi) return;
    spotifyApi
      ?.getMySavedAlbums()
      .then((data) => {
        console.log(data);
        setUserSavedAlbums({
          albums: data.body.items,
          next: data.body.next,
          previous: data.body.previous,
        });
      })
      .catch((err) => console.log(err));
  }, [spotifyApi]);

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {userSavedAlbums?.albums?.map((a) => {
        let album = a.album;
        let id = album.id;

        return (
          <div
            className="py-2 w-25 h-30"
            style={{ border: "1px solid white" }}
            key={id}
          >
            <p>{album.artists[0].name}</p>
            <img alt={album.name} src={album.images[2].url}></img>
            <p>{album.name}</p>
          </div>
        );
      })}
    </div>
  );
}
