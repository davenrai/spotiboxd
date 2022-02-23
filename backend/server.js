require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());
const SpotifyWebApi = require("spotify-web-api-node");

// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;

let credentials = {
  redirectUri: "http://localhost:4000/callback",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};

const spotifyApi = new SpotifyWebApi(credentials);

var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app login
app.get("/login", (req, res) => {
  let state = generateRandomString(16);
  res.cookie("STATE_KEY", state);
  let scopes = ["user-read-private user-read-email user-library-read"];
  let authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
  console.log(authorizeURL);
  res.redirect(authorizeURL);
});

app.get("/callback", (req, res) => {
  let { code, state } = req.query;
  // handle state from req.cookie
  if (code && state) {
    spotifyApi
      .authorizationCodeGrant(code)
      .then((data) => {
        console.log("The token expires in " + data.body["expires_in"]);
        console.log("The access token is " + data.body["access_token"]);
        console.log("The refresh token is " + data.body["refresh_token"]);
        // let accessToken = data.body["access_token"];
        // let refreshToken = data.body["refresh_token"];
        let {
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: expiresIn,
        } = data.body;
        // spotifyApi.setAccessToken(accessToken);
        // spotifyApi.setRefreshToken(refreshToken);
        // console.log("Access/Refresh Token Set.");
        // const params = new URLSearchParams({
        //   accessToken: accessToken,
        //   refreshToken: refreshToken,
        // });
        //spotifyApi.getMe().then(({ body }) => console.log(body));
        const params = new URLSearchParams({
          accessToken: accessToken,
          refreshToken: refreshToken,
          expiresIn: expiresIn,
        });
        res.redirect(`http://localhost:3000/?${params}`);
      })
      .catch((err) => console.log("Error occured authorizing code.", err));
  }
});

app.post("/refreshToken", (req, res) => {
  const refreshToken = req.body.refreshToken;
  console.log("RECEIVED REFRESH TOKEN", refreshToken);
  if (!refreshToken) return;
  spotifyApi.setRefreshToken(refreshToken);
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      console.log(" The access token has been refreshed.");

      res.json({
        accessToken: data.body["access_token"],
        expiresIn: data.body["expires_in"],
      });
    })
    .catch((err) => {
      console.log("Error refreshing token ", err);
    });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
