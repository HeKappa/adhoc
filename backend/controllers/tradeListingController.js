// backend/controllers/tradeListingController.js
const TradeListing = require('../models/TradeListing');

// Create Trade Listing
exports.createTradeListing = async (req, res) => {
    const { product, price, description, shippingOptions, postedBy } = req.body;
    try {
        const listing = await TradeListing.create({
            product,
            price,
            description,
            shippingOptions,
            postedBy
        });
        res.status(201).json(listing);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get All Trade Listings
exports.getAllTradeListings = async (req, res) => {
    try {
        const listings = await TradeListing.find();
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get Trade Listing by ID
exports.getTradeListingById = async (req, res) => {
    try {
        const listing = await TradeListing.findById(req.params.id);
        if (!listing) return res.status(404).json({ message: 'Listing not found' });
        res.status(200).json(listing);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update Trade Listing
exports.updateTradeListing = async (req, res) => {
    try {
        const listing = await TradeListing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!listing) return res.status(404).json({ message: 'Listing not found' });
        res.status(200).json(listing);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete Trade Listing
exports.deleteTradeListing = async (req, res) => {
    try {
        const listing = await TradeListing.findByIdAndDelete(req.params.id);
        if (!listing) return res.status(404).json({ message: 'Listing not found' });
        res.status(200).json({ message: 'Listing deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
