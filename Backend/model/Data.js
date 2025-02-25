const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  image: [String] , 
  brand_image: String,
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





// const mongoose = require('mongoose');

// const customerSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   phoneNumber: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, required: true },
// });

// module.exports = mongoose.model('Customer', customerSchema);
