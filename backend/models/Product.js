// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:          { type: String, required: true },
    category:      { type: String, required: true },
    offeredBy:     { type: String, required: true }, // Username of the user
    location:      { type: String, required: true },
    quantity:      { type: Number, required: true },
    createdAt:     { type: Date, default: Date.now },
    lastUpdatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
