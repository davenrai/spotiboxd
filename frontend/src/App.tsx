import "./App.css";
import Login from "./components/Login";
// import { Link, Route, Routes, useSearchParams } from "react-router-dom";

const userSpotifyCode = new URLSearchParams(window.location.search).get("code");

function App() {
  return (
    <div className="">
      <h1>Welcome to Spotiboxd!</h1>
      {userSpotifyCode ? <div>{userSpotifyCode}</div> : <Login />}
    </div>
  );
}

export default App;
