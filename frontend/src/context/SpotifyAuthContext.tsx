import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { getTokenParams } from "../util/auth";

export type GlobalContent = {
  accessToken?: any;
  refreshToken?: any;
  expiresAt?: number;
  api?: any;
  setAuthData?(data: any): void;
};

export const SpotifyUserContext = createContext<GlobalContent>({});
export const SpotifyAuthProvider = (props: {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  const [auth, setAuth] = useState(null);
  const setAuthData = (data: any) => {
    setAuth(data);
  };
  const authContextValue = { ...auth, setAuthData };
  const params = new URLSearchParams(window.location.search);
  let spotifyApi = new SpotifyWebApi({
    clientId: "327623f8bf6c4fb399f6261e14847497",
  });
  // Set token info from local storage to context
  useEffect(() => {
    try {
      let data = JSON.parse(window?.localStorage?.getItem("auth")) ?? null;
      if (!data) return;
      if (data && Date.now() < data.expiresAt) {
        spotifyApi.setCredentials({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });
        setAuthData({ ...data, api: spotifyApi });
      } else {
        let oldAuth = JSON.parse(window.localStorage.getItem("auth"));
        if (!oldAuth) return;
        let { refreshToken } = oldAuth;
        if (!refreshToken) return;
        axios
          .post("/refreshToken", {
            refreshToken: refreshToken,
          })
          .then((res) => {
            console.log(res.data);
            let {
              accessToken,
              expiresIn,
            }: { accessToken: string; expiresIn: string } = res.data;
            spotifyApi.setAccessToken(accessToken);
            setAuthData({
              accessToken: accessToken,
              refreshToken: refreshToken,
              expiresAt: Date.now() + parseInt(expiresIn) * 1000,
              api: spotifyApi,
            });
            window.localStorage.setItem(
              "auth",
              JSON.stringify({
                accessToken: accessToken,
                refreshToken: refreshToken,
                expiresAt: Date.now() + parseInt(expiresIn) * 1000,
              })
            );
          });
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    if (params && !auth) {
      const tokenInfo = getTokenParams(params);
      window.history.pushState({}, null, "/");
      if (tokenInfo === null) return;

      setAuthData(tokenInfo);
    }
  }, [params]);

  useEffect(() => {
    if (auth) {
      window.localStorage.setItem("auth", JSON.stringify(auth));
    }
  }, [auth]);
  return (
    <SpotifyUserContext.Provider value={authContextValue}>
      {props.children}
    </SpotifyUserContext.Provider>
  );
};

export const useAuth = () => React.useContext(SpotifyUserContext);
