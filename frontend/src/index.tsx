import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import Dashboard from "./components/Dashboard";
import {
  SpotifyAuthProvider,
  SpotifyUserContext,
} from "./context/SpotifyAuthContext";

ReactDOM.render(
  <BrowserRouter>
    <SpotifyAuthProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
        <Route path="/dashboard/" element={<Dashboard />}></Route>
        <Route
          path="/user/:accessToken/:refreshToken/:expiresIn"
          element={<Dashboard />}
        ></Route>
        {/* <Route path="expenses" element={<Expenses />} />
      <Route path="invoices" element={<Invoices />} /> */}
      </Routes>
    </SpotifyAuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
