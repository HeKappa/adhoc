// backend/models/TradeRequest.js
const mongoose = require('mongoose');

const TradeRequestSchema = new mongoose.Schema({
  from: { type: String, required: true }, // Username of the requester
  to: { type: String, required: true }, // Username of the recipient
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'TradeListing', required: true },
  productOffered: { type: String, required: true }, // Product name
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TradeRequest', TradeRequestSchema);