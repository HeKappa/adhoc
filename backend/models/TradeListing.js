// backend/models/TradeListing.js
const mongoose = require('mongoose');

const tradeListingSchema = new mongoose.Schema({
    product:        { type: String, required: true }, // Product name
    price:          { type: Number, required: true },
    description:    { type: String },
    shippingOptions: { type: String, enum: ['STANDARD', 'EXPRESS', 'PICKUP'], required: true },
    createdAt:      { type: Date, default: Date.now },
    lastUpdatedAt:  { type: Date, default: Date.now },
    postedBy:       { type: String, required: true } // Username of the user
});

module.exports = mongoose.model('TradeListing', tradeListingSchema);
