const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    sellerName: { type: String, required: true },
    sellerPhoneNumber: { type: String, required: true },
    sellerEmail: { type: String, required: true, unique: true },
    sellerPassword: { type: String, required: true },
    role: { type: String, required: true }
})

module.exports = mongoose.model('Vendor', vendorSchema);