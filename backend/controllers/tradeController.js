// controllers/tradeController.js
const Trade = require('../models/Trade');
const TradeListing = require('../models/TradeListing');
const Product = require('../models/Product');

// Create Trade
exports.createTrade = async (req, res) => {
  const { offerBy, acceptedBy, productOffered, productGotten } = req.body;
  try {
      // Create Trade
      const trade = await Trade.create({ offerBy, acceptedBy, productOffered, productGotten });

      // Update Products' offeredBy fields
      await Product.updateOne({ name: productOffered }, { offeredBy: acceptedBy });
      await Product.updateOne({ name: productGotten }, { offeredBy: offerBy });

      // Remove Trade Listing if needed
      await TradeListing.findOneAndDelete({ product: productGotten, postedBy: acceptedBy });

      res.status(201).json(trade);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
};

// Create Trade Request
exports.createTradeRequest = async (req, res) => {
    const { from, to, listingId, productOffered } = req.body;
  
    try {
      const listing = await TradeListing.findById(listingId);
      if (!listing) {
        return res.status(404).json({ message: 'Trade listing not found' });
      }
  
      // Create a trade request
      const tradeRequest = await TradeRequest.create({
        from,
        to,
        listingId,
        productOffered,
      });
  
      res.status(201).json(tradeRequest);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };

// Get All Trades
exports.getAllTrades = async (req, res) => {
  try {
      const trades = await Trade.find();
      res.status(200).json(trades);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
};
