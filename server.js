// server.js or app.js
const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const session = require("express-session");
const flash = require("express-flash");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const passport = require("passport");
require("dotenv").config();
const Emitter = require("events");

// MongoDB URI
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/pizza";

// Connect to MongoDB
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch((err) => {
    console.error("Connection failed!", err);
  });

// Initialize mongoStore
const mongoStore = MongoStore.create({
  mongoUrl: url,
  collectionName: "sessions",
});

// Event Emitter
const eventEmitter = new Emitter();
app.set("eventEmitter", eventEmitter);

// Session config
app.use(
  session({
    secret: process.env.COOKIES_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

// Passport config
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// Flash messages
app.use(flash());

// Assets
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

// Setting template engine
const viewsPath = path.join(__dirname, "/resources/views");
app.use(expressLayout);
app.set("views", viewsPath);
app.set("view engine", "ejs");

// Import routes
require("./routes/web")(app);

// Start server
const server = app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

// Socket.IO setup
const io = require("socket.io")(server);

io.on("connection", (socket) => {

  socket.on("join", (orderId) => {
    socket.join(orderId);
  });
});

// Listen for order updates
eventEmitter.on("orderUpdated", (data) => {
  io.to(`order_${data.id}`).emit("orderUpdated", data);
});


eventEmitter.on('orderPlaced',(data)=>{

  io.to('adminRoom').emit('orderPlaced',data)

})