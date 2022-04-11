import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import { SpotifyUserContext, useAuth } from "../context/SpotifyAuthContext";
import AlbumView from "./AlbumView";
import Nav from "./Nav";
import Profile from "./Profile";
import UserReviews from "./UserReviews";

export default function Dashboard({ auth }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState(null);
  const [showUser, setShowUser] = useState<boolean>(false);

  let spotifyApi = auth.api;

  useEffect(() => {
    if (!spotifyApi || !auth.accessToken) return;
    spotifyApi
      ?.getMe()
      .then((data) => {
        setUserDetails({
          ...data.body,
        });
      })
      .catch((err) => console.log(err));
  }, [auth]);

  return (
    <div className="h-100">
      {userDetails ? (
        <div className="">
          <Nav
            avatar={userDetails?.images[0].url}
            name={userDetails?.display_name}
          />
          {showUser ? (
            <div></div>
          ) : (
            <AlbumView api={spotifyApi} userId={userDetails?.id} />
          )}
        </div>
      ) : (
        <div className="justify-content-center align-items-center m-auto">
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
}
