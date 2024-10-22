const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");
const guest = require('../app/http/middlewares/guest');

function initRoutes(app) {
  const homectrl = homeController();
  const authctrl = authController();
  const cartctrl = cartController();

  app.get("/", homectrl.index.bind(homectrl));
  
  app.get("/login",  authctrl.login.bind(authctrl));
  app.post("/login", authctrl.postLogin.bind(authctrl)); // Use the same instance
  
  app.get("/register", authctrl.register.bind(authctrl));
  app.post("/register", authctrl.postRegister.bind(authctrl));

  app.post("/logout", authctrl.logout.bind(authctrl));

  app.get("/cart", cartctrl.index.bind(cartctrl));
  app.post("/update-cart", cartctrl.update.bind(cartctrl)); // Use the correct cartctrl instance
}

module.exports = initRoutes;
