import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import axios from "axios";
import { useAuth } from "./context/SpotifyAuthContext";

function App() {
  const { accessToken, refreshToken, expiresAt, api } = useAuth();

  return (
    <div
      style={{ textAlign: "center", backgroundColor: "black", height: "100vh" }}
    >
      {accessToken && api ? (
        <Dashboard auth={{ accessToken, api }} />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
