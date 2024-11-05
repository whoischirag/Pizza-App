const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");
const guest = require("../app/http/middlewares/guest");
const orderController = require("../app/http/controllers/customers/orderController");
const adminOrderController = require('../app/http/controllers/admin/orderController')
const admin =require('../app/http/middlewares/admin')
const statusController = require('../app/http/controllers/admin/statusController')

function initRoutes(app) {
  const homectrl = homeController();
  const authctrl = authController();
  const cartctrl = cartController();
  const orderctrl = orderController();
 const adminOrderctrl= adminOrderController()
 const statusctrl= statusController()


  app.get("/", homectrl.index.bind(homectrl));

  app.get("/login", authctrl.login.bind(authctrl));//guest middleware here 
  app.post("/login", authctrl.postLogin.bind(authctrl)); // Use the same instance

  app.get("/register", authctrl.register.bind(authctrl)); //guest middleware here 
  app.post("/register", authctrl.postRegister.bind(authctrl));

  app.post("/logout", authctrl.logout.bind(authctrl));

  app.get("/cart", cartctrl.index.bind(cartctrl));
  app.post("/update-cart", cartctrl.update.bind(cartctrl)); // Use the correct cartctrl instance

  //Customer routes

  app.post("/order", orderctrl.store.bind(orderctrl));
  app.get("/customer/orders", orderctrl.index.bind(orderctrl)); // auth middleware here 
  app.get("/customer/orders/:id", orderctrl.show.bind(orderctrl)); // auth middleware here 
  


  //Admin routes
  app.get("/admin/orders",admin, adminOrderctrl.index.bind(adminOrderctrl));
  app.post("/admin/order/status",admin, statusctrl.update.bind(statusctrl));
  




}

module.exports = initRoutes;
