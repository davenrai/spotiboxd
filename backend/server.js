require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());
const SpotifyWebApi = require("spotify-web-api-node");

let credentials = {
  redirectUri: "http://localhost:3000",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};

const spotifyApi = new SpotifyWebApi(credentials);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app login
app.get("/login", (req, res) => {
  console.log("hello");
  let state = generateRandomString(16);
  let scopes = ["user-read-private user-read-email"];
  let authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
  console.log(authorizeURL);
  res.redirect(authorizeURL);
});

// app callback route!

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
