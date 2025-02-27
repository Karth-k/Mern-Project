const mongoose = require("mongoose");

// const cartSchema = new mongoose.Schema(
//   {
//     customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
//     productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // Reference to Product _id
//     title: { type: String, required: true },
//     price: { type: Number, required: true },
//     image: { type: String, required: true },
//     quantity: { type: Number, required: true, default: 1 },
//     selectedSize: { type: String, required: true },
//   },
//   { timestamps: true }
// );


const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  items: { type: Array, default: [] },
});


module.exports = mongoose.model("Cart", cartSchema);