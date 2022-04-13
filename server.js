require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const path = require("path");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_URI = process.env.FRONTEND_URI || "http://localhost:3000";
const SECRET = process.env.SECRET;

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

function checkToken(req, res, next) {
  try {
    const header = req.headers["authorization"];
    if (typeof header !== "undefined") {
      const bearer = header.split(" ");
      const token = bearer[1];

      req.token = token;
      next();
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
}

function generateJSONWebToken(accessToken) {
  try {
    spotifyApi.setAccessToken(accessToken);
    spotifyApi
      .getMe()
      .then((data) => {
        return data.body.id;
      })
      .then((userId) => {
        let token = jwt.sign({ userId }, secret);
        console.log(token);
        return token;
      });
  } catch (err) {
    console.log(err);
  }
}
// app login
app.get("/login", (req, res) => {
  let state = generateRandomString(16);
  res.cookie("STATE_KEY", state);
  let scopes = ["user-read-private user-read-email user-library-read"];
  let authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
  res.redirect(authorizeURL);
});

app.get("/callback", (req, res) => {
  let { code, state } = req.query;
  // handle state from req.cookie
  if (code && state) {
    spotifyApi.authorizationCodeGrant(code).then((data) => {
      console.log("The token expires in " + data.body["expires_in"]);
      console.log("The access token is " + data.body["access_token"]);
      console.log("The refresh token is " + data.body["refresh_token"]);

      let {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: expiresIn,
      } = data.body;
      try {
        // Code needs to be cleaned here
        spotifyApi.setAccessToken(accessToken);
        spotifyApi
          .getMe()
          .then((data) => {
            return data.body.id;
          })
          .then((userId) => {
            let token = jwt.sign({ userId }, SECRET);
            console.log(token);
            const params = new URLSearchParams({
              accessToken: accessToken,
              refreshToken: refreshToken,
              expiresIn: expiresIn,
              token: token,
            });
            res.redirect(`${FRONTEND_URI}/?${params}`);
          });
      } catch (err) {
        res.sendStatus(403);
      }
      // console.log(`TOKEN ${token}`);
      // const params = new URLSearchParams({
      //   accessToken: accessToken,
      //   refreshToken: refreshToken,
      //   expiresIn: expiresIn,
      //   token: token,
      // });
      // res.redirect(`${FRONTEND_URI}/?${params}`);
    });
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
      let token = generateJSONWebToken(data.body.access_token);
      res.json({
        accessToken: data.body["access_token"],
        expiresIn: data.body["expires_in"],
        token,
      });
    })
    .catch((err) => {
      console.log("Error refreshing token ", err);
    });
});

app.get("/review", checkToken, (req, res) => {
  let userId = req.query.user;
  let albumId = req.query.album;
  let decodedToken = jwt.verify(req.token, SECRET, (err, authorizedData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (userId !== authorizedData.userId) {
        res.sendStatus(403);
      }
    }
  });

  db.query(
    "SELECT * FROM album_reviews WHERE user_id=$1 AND album_id=$2",
    [userId, albumId],
    (err, result) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.post("/review", checkToken, (req, res) => {
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

app.get("/reviews", checkToken, (req, res) => {
  let userId = req.query.userId;
  db.query(
    "SELECT * FROM album_reviews WHERE user_id = $1",
    [userId],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result.rows);
    }
  );
});

app.post("/rating", checkToken, (req, res) => {
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

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
