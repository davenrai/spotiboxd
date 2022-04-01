require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const path = require("path");
const app = express();
const port = process.env.PORT || 4000;
const FRONTEND_URI = process.env.FRONTEND_URI || "http://localhost:3000";

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  // server static content
  app.use(express.static(path.join(__dirname, "frontend/build")));
}

const SpotifyWebApi = require("spotify-web-api-node");

let credentials = {
  redirectUri: process.env.REDIRECT_URI,
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

        let {
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: expiresIn,
        } = data.body;

        const params = new URLSearchParams({
          accessToken: accessToken,
          refreshToken: refreshToken,
          expiresIn: expiresIn,
        });
        res.redirect(`${FRONTEND_URI}/?${params}`); // Need to remove localhost.. because this is what prod goes to after login http://localhost:3000/?accessToken=BQABo4Zm526pcUzLJaEnzm8HhUnEtT2C_Sku3bUF5BXKvjtQxZqtXIqFCgAfRvwc3B_67dxamko-3M5hrTKhlgIzK9GtyFu9UVo2nX0Tov3GBMZ7DZDEw6B6Rg3Z35CzJg_8u_alFqHaONaVjDXVcP8vQNWlaXAZHeP_r7oBuw&refreshToken=AQCs_EJ8GOGXaqrhhuZiCAPP0Ajit8Mz8bSXFx4csDuzgA-HObZYnFi2jX6EVwutDx2jr5YvDM0G0TuqyiwsDhdCWUgO1_J0SHRf1hLLvsO-gJ0RSVAx0Fcs8bfU0eOfoEA&expiresIn=3600
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

app.get("/reviews", (req, res) => {
  db.query("SELECT * FROM album_reviews", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result.rows);
  });
});

app.get("/review", (req, res) => {
  let userId = req.query.user;
  let albumId = req.query.album;

  db.query(
    "SELECT * FROM album_reviews WHERE user_id=($1) AND album_id=($2)",
    [userId, albumId],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result.rows);
    }
  );
});

app.post("/review", (req, res) => {
  console.log(req.body);
  db.query(
    "INSERT INTO album_reviews VALUES ($1, $2, $3, $4, $5) ON CONFLICT (user_id, album_id) DO UPDATE SET review = $3, artist = $4, album_title = $5",
    [
      req.body.id,
      req.body.albumId,
      req.body.review,
      req.body.artist,
      req.body.title,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/reviews", (req, res) => {
  let userId = req.query.userId;
  db.query(
    "SELECT * FROM album_reviews WHERE id = $1",
    [userId],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.post("/rating", (req, res) => {
  console.log(req.body);
  db.query(
    "INSERT INTO album_reviews (user_id, album_id, artist, album_title, track_ratings) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (user_id, album_id) DO UPDATE SET track_ratings = $5",
    [
      req.body.id,
      req.body.albumId,
      req.body.artist,
      req.body.title,
      req.body.ratings,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.listen(process.env.PORT || port, () => {
  console.log(`listening on port ${port}`);
});
