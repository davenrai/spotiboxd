import React, { useEffect, useState, useContext } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import AlbumPreview from "./AlbumPreview";

const LIMIT = 10;

export default function AlbumView({ api: spotifyApi }) {
  const [userSavedAlbums, setUserSavedAlbums] = useState<any>(null);
  const [searchedAlbums, setSearchedAlbums] = useState<any>(null);
  const [albumSearch, setAlbumSearch] = useState<string>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
  // pass auth here as props so it's not happening in dashboard.
  // use UseEffect to call user's saved albums

  // Add a search bar to allow a user to search for an album.
  // as default, show the user's saved albums (kinda as a starter)
  // From there each album should have it's own component which lists
  // it's songs (and its details), copyright, etc. (Maybe even include a player?)
  useEffect(() => {
    if (!spotifyApi) return;
    spotifyApi
      ?.getMySavedAlbums({ limit: LIMIT, offset: 0 })
      .then((data) => {
        console.log(data);
        let { items, next, previous, limit, offset, total } = data.body;
        setUserSavedAlbums({
          albums: items,
          next: next,
          previous: previous,
          limit: limit,
          offset: offset,
          total: total,
        });
      })
      .catch((err) => console.log(err));
  }, [spotifyApi]);

  useEffect(() => {
    if (!albumSearch) return;
    spotifyApi
      .searchAlbums(albumSearch, { limit: 10, offset: 0 })
      .then((data) => {
        console.log(data.body);
        setSearchedAlbums({
          albums: data.body.albums.items,
          next: data.body.albums.next,
          previous: data.body.albums.previous,
        });
      });
  }, [albumSearch]);

  useEffect(() => {
    if (!userSavedAlbums) {
      return;
    }
  });

  const handlePagination = (type) => {
    try {
      if (userSavedAlbums.offset === 0 && type === "previous") return;
      spotifyApi
        ?.getMySavedAlbums({
          limit: LIMIT,
          offset:
            type === "next"
              ? userSavedAlbums.offset + userSavedAlbums.limit
              : userSavedAlbums.offset - userSavedAlbums.limit,
        })
        .then((data) => {
          console.log(data);
          let { items, next, previous, limit, offset } = data.body;
          setUserSavedAlbums({
            albums: items,
            next: next,
            previous: previous,
            limit: limit,
            offset: offset,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="my-5">
      <h1>Selected Album {selectedAlbum}</h1>
      <Form.Group className="my-3 m-auto w-50" controlId="">
        <Form.Label>Search for an Album</Form.Label>
        <Form.Control
          type="search"
          onChange={(e) => setAlbumSearch(e.target.value)}
          placeholder="Enter an album title here..."
        />
      </Form.Group>
      <AlbumPreview
        albums={userSavedAlbums?.albums}
        setSelectedAlbum={setSelectedAlbum}
      />
    </div>
  );
}
