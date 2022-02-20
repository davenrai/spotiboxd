import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SpotifyAuthProvider } from "./context/SpotifyAuthContext";

ReactDOM.render(
  <StrictMode>
    <SpotifyAuthProvider>
      <App />
    </SpotifyAuthProvider>
  </StrictMode>,
  document.getElementById("root")
);
