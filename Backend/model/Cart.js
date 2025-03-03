const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  items: { type: Array, default: [] },
});


module.exports = mongoose.model("Cart", cartSchema);