import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { SpotifyUserContext } from "./context/SpotifyAuthContext";
import { useContext, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

function App() {
  const { auth } = useContext(SpotifyUserContext);
  return (
    <div
      style={{ textAlign: "center", backgroundColor: "black", height: "100vh" }}
    >
      {auth?.accessToken ? <Dashboard auth={auth} /> : <Login />}
    </div>
  );
}

export default App;
