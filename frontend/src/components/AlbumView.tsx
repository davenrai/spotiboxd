import React, { useEffect, useState, useContext } from "react";
import { Container, Form, CloseButton } from "react-bootstrap";
import AlbumDetails from "./AlbumDetails";
import AlbumPreview from "./AlbumPreview";
import UserReviews from "./UserReviews";

const LIMIT = 10;

export default function AlbumView({ api: spotifyApi, userId }) {
  const [userSavedAlbums, setUserSavedAlbums] = useState<any>(null);
  const [searchedAlbums, setSearchedAlbums] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>(null);
  const [selectedAlbumId, setSelectedAlbumId] = useState<any>(null);
  const [selectedAlbumDetails, setSelectedAlbumDetails] = useState<any>(null);

  useEffect(() => {
    if (!spotifyApi) return;
    spotifyApi
      ?.getMySavedAlbums({ limit: LIMIT, offset: 0 })
      .then((data) => {
        let { items, next, previous, limit, offset, total } = data.body;
        let albums = data.body.items.map((a) => a.album);
        setUserSavedAlbums({
          albums: albums,
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
    if (!searchTerm) return;
    spotifyApi
      .searchAlbums(searchTerm, { limit: 10, offset: 0 })
      .then((data) => {
        setSearchedAlbums({
          albums: data.body.albums.items,
          next: data.body.albums.next,
          previous: data.body.albums.previous,
        });
      });
  }, [searchTerm]);

  useEffect(() => {
    if (!selectedAlbumId) {
      return;
    }
    spotifyApi.getAlbum(selectedAlbumId).then((data) => {
      let { artists, id, images, label, name, release_date, tracks, uri } =
        data.body;
      setSelectedAlbumDetails({
        artists,
        id,
        images,
        label,
        name,
        release_date,
        tracks,
        uri,
      });
    });
  }, [selectedAlbumId]);

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
          let { items, next, previous, limit, offset } = data.body;
          let albums = items.map((item) => item.album);
          setUserSavedAlbums({
            albums: albums,
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
      <UserReviews userId={userId} setSelectedAlbumId={setSelectedAlbumId} />
      <Container>
        {selectedAlbumDetails && (
          <React.Fragment>
            <div style={{ textAlign: "right" }}>
              <CloseButton
                onClick={() => {
                  setSelectedAlbumId(null);
                  setSelectedAlbumDetails(null);
                }}
                variant="white"
              />
            </div>
            <AlbumDetails
              userId={userId}
              id={selectedAlbumId}
              title={selectedAlbumDetails.name}
              images={selectedAlbumDetails.images}
              artists={selectedAlbumDetails.artists}
              tracks={selectedAlbumDetails.tracks}
            />
          </React.Fragment>
        )}
      </Container>
      <Form.Group className="my-3 m-auto w-50" controlId="">
        <Form.Label>Search for an Album</Form.Label>
        <Form.Control
          type="search"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter an album title here..."
        />
      </Form.Group>
      <AlbumPreview
        albums={searchTerm ? searchedAlbums?.albums : userSavedAlbums?.albums}
        setSelectedAlbum={setSelectedAlbumId}
        handlePagination={handlePagination}
        isUserPreview={!searchTerm}
      />
    </div>
  );
}
