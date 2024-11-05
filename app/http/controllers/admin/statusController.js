// app/http/controllers/admin/statusController.js
const Order = require("../../../models/order");

function statusController() {
  return {
    async update(req, res) {
      const { orderId, status } = req.body;

      try {
        // Update the order status
        const result = await Order.updateOne(
          { _id: orderId },
          { status: status }
        );

        // Emit an event for the updated order
        const eventEmitter = req.app.get('eventEmitter');
        eventEmitter.emit('orderUpdated', { id: req.body.orderId, status: req.body.status });
        

        return res.redirect("/admin/orders");
      } catch (err) {
        console.error(err); // Log the error for debugging
        return res.redirect("/admin/orders");
      }
    },
  };
}

module.exports = statusController;
 