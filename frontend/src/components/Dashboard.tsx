import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/SpotifyAuthContext";

export default function Dashboard() {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);

  let params: any = useParams();

  let cont = useAuth();

  useEffect(() => {
    if (params) {
      console.log(params);
      setAccessToken(params?.accessToken);
      setExpiresAt(Date.now() + params?.expiresIn);
      const tokenInfo = {
        accessToken: params?.accessToken,
        refreshToken: params?.refreshToken,
        expiresAt: params?.expiresIn,
      };
      window.localStorage.setItem("auth", JSON.stringify(tokenInfo));

      cont?.setAuthData?.(tokenInfo);

      // setAccessToken(params["accessToken"])
      // setRefreshToken(params.get("refreshToken"))
      // setExpiresIn(params)
    }
  }, [params]);
  return <div>Dashboard {cont.auth ? cont.auth.accessToken : "nothing"}</div>;
}
