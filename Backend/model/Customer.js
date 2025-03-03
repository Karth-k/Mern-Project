const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  addresses: [
    {
      pincode: { type: String, required: true },
      mobile: { type: String, required: true },
      fullName: { type: String, required: true },
      locality: { type: String, required: true },
      houseDetails: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      addressType: { type: String, enum: ["home", "office"], required: true },
    },
  ],
}); 

module.exports = mongoose.model('Customer', customerSchema);
