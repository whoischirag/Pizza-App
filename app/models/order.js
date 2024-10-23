const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: Object,
      required: true,
    },
    mobile: {
        type: Number,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      paymentType: {
    type:String,
    default:'COD'  
    },
    status: {
        type: Object,
        default:"order_placed",
      },
  },
  { collection: "order", timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
