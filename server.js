const PORT = "8080";
module.exports = PORT;

const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;
require("dotenv").config({ path: "config.env" });

const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:" + PORT + "/auth/discord/callback";

const app = express();

//static-file
app.use(express.static("public"));
//bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
//ejs
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejs.renderFile);
app.set("view engine", "ejs");

//discord-auth
app.use(
  session({
    secret: "your_secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
passport.use(
  new DiscordStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: REDIRECT_URI,
      scope: ["identify"],
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

const getRoutes = (name) => require("./routes/" + name);
app.use("/auth", getRoutes("auth"));
app.use("/calc", getRoutes("calc"));

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log("start");
});
