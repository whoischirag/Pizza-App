const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const session = require('express-session');
const flash = require('express-flash');
const MongoStore = require('connect-mongo');
const mongoose = require("mongoose");
require('dotenv').config();

const url = "mongodb://localhost:27017/pizza";

// Connect to MongoDB
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to Database!");
}).catch((err) => {
  console.error("Connection failed!", err);
});

// Initialize mongoStore
const mongoStore = MongoStore.create({
  mongoUrl: url,
  collectionName: 'sessions',
});

// Session config
app.use(session({
  secret: process.env.COOKIES_SECRET,
  resave: false,
  saveUninitialized: false,
  store: mongoStore,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

app.use(flash());

// Assets
app.use(express.static("public"));
app.use(express.json())

//global middleware
app.use((req,res,next)=>{
  res.locals.session= req.session
  next()


})

// Setting template engine
const viewsPath = path.join(__dirname, "/resources/views");
app.use(expressLayout);
app.set("views", viewsPath);
app.set("view engine", "ejs");

// Import routes
require("./routes/web")(app);

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
