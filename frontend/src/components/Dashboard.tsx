import React, { useContext, useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { SpotifyUserContext, useAuth } from "../context/SpotifyAuthContext";
import AlbumView from "./AlbumView";
import Nav from "./Nav";
import Profile from "./Profile";

const spotifyApi = new SpotifyWebApi({
  clientId: "327623f8bf6c4fb399f6261e14847497",
});

export default function Dashboard({ auth }) {
  const [userDetails, setUserDetails] = useState(null);
  const [userSavedAlbums, setUserSavedAlbums] = useState(null);

  useEffect(() => {
    if (!auth.accessToken) return;
    spotifyApi.setAccessToken(auth.accessToken);
    spotifyApi.setRefreshToken(auth.refreshToken);
  }, [auth]);

  useEffect(() => {
    if (auth.accessToken) {
      spotifyApi
        ?.getMe()
        .then(function (data) {
          console.log(
            "Some information about the authenticated user",
            data.body
          );
          setUserDetails({
            email: data.body.email,
            id: data.body.id,
            displayName: data.body.display_name,
            profileImg: data.body.images[0].url,
          });
        })
        .catch((err) => console.log(err));

      spotifyApi?.getMySavedAlbums().then((data) => {
        setUserSavedAlbums({
          albums: data.body.items,
          next: data.body.next,
          previous: data.body.previous,
        });
      });
    }
  }, [auth.accessToken]);

  return (
    <div>
      <Nav />
      {userDetails && <Profile userDetails={userDetails} />}
      {userSavedAlbums && <AlbumView albums={userSavedAlbums.albums} />}
    </div>
  );
}
