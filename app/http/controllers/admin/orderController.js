const Order = require("../../../models/order");

function adminOrderController() {
  return {
    async index(req, res) {
      try {
        const orders = await Order.find({ status: { $ne: "completed" } }, null, {
          sort: { createAt: -1 },
        })
          .populate("customerId", "-password");

        if (req.xhr) {
          return res.json(orders);
        } else {
          return res.render("admin/orders", { orders });
        }
      } catch (err) {
        // Handle error (you can log it or send an error response)
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }
    },
  };
}

module.exports = adminOrderController;
