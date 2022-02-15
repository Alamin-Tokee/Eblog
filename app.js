const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const localStrategy = require("passport-local");
const methodOverride = require("method-override");
const User = require("./models/user");

// Data Base Connect 
const connectDB = require("./config/db");
connectDB();

// General Configuration

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//Routes
const commentRoutes = require("./routes/comments");
const postRoutes = require("./routes/posts");
const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/user");


// Passport configuration
app.use(require("express-session")({
    secret:"I am alamin",
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//To get current logged in user
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
});

//Routes configure
app.use("/", indexRoutes);
app.use("/posts", postRoutes);
app.use("/posts/:id/comments", commentRoutes);
app.use("/user", userRoutes);

//Create the server

let port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Sever Listening at http://localhost:${port}`);
});

