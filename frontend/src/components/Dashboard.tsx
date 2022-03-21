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
  // const [selectedAlbumId, setSelectedAlbumId] = useState<any>(null);
  let spotifyApi = auth.api;

  useEffect(() => {
    spotifyApi
      ?.getMe()
      .then(function (data) {
        setUserDetails({
          ...data.body,
        });
      })
      .catch((err) => console.log(err));
  }, [auth.accessToken]);

  return (
    <div className="h-100">
      {userDetails ? (
        <div className="">
          <Nav
            avatar={userDetails?.images[0].url}
            name={userDetails?.display_name}
          />

          {/* <Profile userDetails={userDetails} /> */}
          <AlbumView api={spotifyApi} userId={userDetails?.id} />
        </div>
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
}
