const Order = require("../../../models/order");
const moment = require("moment");

function orderController() {
  return {
    // Store method to handle placing the order
    async store(req, res) {
      const { mobile, address } = req.body;

      // Check if mobile or address is missing
      if (!mobile || !address) {
        req.flash("error", "All fields are required!");
        return res.redirect("/cart");
      }

      // Check if user is logged in
      if (!req.user) {
        req.flash("error", "Unauthorized");
        return res.redirect("/cart");
      }

      try {
        // Create a new order with session cart items and user details
        const order = new Order({
          customerId: req.user._id,
          items: req.session.cart.items,
          mobile,
          address,
        });

        // Save the order to the database
        const savedOrder = await order.save();

        // Populate the 'customerId' field with the user details
        const placedOrder = await Order.populate(savedOrder, { path: "customerId" });

        // Flash success message
        req.flash("success", "Order placed successfully");

        // Clear the cart from session
        delete req.session.cart;

        // Emit the orderPlaced event
        const eventEmitter = req.app.get("eventEmitter");
        eventEmitter.emit("orderPlaced", placedOrder);

        // Redirect to the orders page
        return res.redirect("/customer/orders");
      } catch (err) {
        // Handle errors during the save or populate process
        console.error(err);
        req.flash("error", "Something went wrong.");
        return res.redirect("/cart");
      }
    },

    // Index method to list orders of the logged-in user
    async index(req, res) {
      // Check if user is logged in
      if (!req.user) {
        return res.status(401).redirect("/"); // Unauthorized access
      }

      try {
        // Fetch all orders placed by the logged-in user, sorted by creation date
        const orders = await Order.find({ customerId: req.user._id }, null, {
          sort: { createdAt: -1 },
        });

        // Render orders page
        res.render("customers/orders", { orders, moment });
      } catch (err) {
        console.error(err);
        return res.status(500).send("Something went wrong.");
      }
    },

    // Show method to display details of a single order
    async show(req, res) {
      // Check if user is logged in
      if (!req.user) {
        return res.status(401).redirect("/"); // Unauthorized access
      }

      try {
        // Find the order by its ID
        const order = await Order.findById(req.params.id);

        // Check if the order exists and the user is authorized to view it
        if (order && req.user._id.toString() === order.customerId.toString()) {
          return res.render("customers/singleOrder", { order });
        }

        // If the user is unauthorized, redirect to home page
        return res.redirect("/");
      } catch (err) {
        console.error(err);
        return res.status(500).send("Something went wrong.");
      }
    },
  };
}

module.exports = orderController;
