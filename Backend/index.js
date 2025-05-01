require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const session = require("express-session");
const passport = require("passport");

connection();

// middlewares
app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

require('./config/passport');

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listening on port ${port}...`));
