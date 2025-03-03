const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  image: [String], 
  image_1: [String],
  image_2: [String],
  brand_image: { type: String, default: null },
  title: { type: String, required: true },
  brand: String,
  price: { type: Number, required: true },
  before_disc: Number,
  offer_percent: Number,
  category: {
    gender: { type: String, required: true, enum: ["Men", "Women", "Kids"] },
    type: { type: String, required: true }, 
    model: { type: String, required: true }, 
  },
  size: [String], 
  Quantity: { type: Number, default: 1 },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true }
});

module.exports = mongoose.model("Data", dataSchema);
