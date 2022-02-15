import React, { createContext, useState, useEffect } from "react";

export type GlobalContent = {
  auth?: any;
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
  const [auth, setAuth] = useState({ data: null });

  const setAuthData = (data: any) => {
    setAuth(data);
  };
  const authContextValue = { auth, setAuthData };

  // Set token info from local storage to context
  useEffect(() => {
    let data = JSON.parse(window.localStorage.getItem("auth") ?? "");
    console.log(data);
    setAuthData(data);
  }, []);
  return (
    <SpotifyUserContext.Provider value={authContextValue}>
      {props.children}
    </SpotifyUserContext.Provider>
  );
};

export const useAuth = () => React.useContext(SpotifyUserContext);
