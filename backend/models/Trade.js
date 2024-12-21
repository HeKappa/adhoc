// backend/models/Trade.js
const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    offerBy:      { type: String, required: true }, // Username
    acceptedBy:   { type: String, required: true }, // Username
    productOffered: { type: String, required: true }, // Product name
    productGotten:  { type: String, required: true }, // Product name
    dateCreated:    { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trade', tradeSchema);
