const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");

function innitRoutes(app) {
  const homectrl = homeController();
  const authctrl = authController();
  const cartctrl = cartController();

  app.get("/", homectrl.index.bind(homectrl));
  app.get("/cart", cartctrl.index.bind(cartctrl));
  app.get("/login", authctrl.login.bind(authctrl));
  app.get("/register", authctrl.register.bind(authctrl));
  app.post('/update-cart', cartController().update)
}

module.exports = innitRoutes;
