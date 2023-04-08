// Set up ======================================================================
// Get all the tools we need
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const flash = require("express-flash");
const morgan = require("morgan");
const connectDB = require("./config/database.js");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");
const dashboardRoutes = require("./routes/dashboard");
const tableRoutes = require("./routes/tables");
const orderRoutes = require("./routes/orders");
const menuItemRoutes = require("./routes/menuitems");
const dotenv = require("dotenv");

const bodyParser = require("body-parser");
const multer = require("multer");

// Configuration ===============================================================

// Require .env file in config folder
dotenv.config({ path: "./config/config.env" }); // load config

// Passport config
require("./config/passport")(passport);

// Connect to our database
connectDB();

// Use ejs for views
app.set("view engine", "ejs");

// Static folder
app.use(express.static("public"));

// Body parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // get information from html forms
app.use(express.json());

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // log every request to the console
}

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    //!Change: MongoStore syntax has changed
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Use flash messages for errors, info, ect...
app.use(flash());

// Routes ======================================================================
app.use("/", mainRoutes);
app.use("/post", postRoutes);//delete this and anything related
app.use("/dashboard", dashboardRoutes);
app.use("/dashboard/tables", tableRoutes);
app.use("/dashboard/order", orderRoutes);
app.use("/dashboard/tables/menuItem", menuItemRoutes);

// Launch ======================================================================
app.listen(
  port,
  console.log(`Server running on ${process.env.NODE_ENV} mode on PORT ${port}`)
);
