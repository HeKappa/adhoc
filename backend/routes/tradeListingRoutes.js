// backend/routes/tradeListingRoutes.js
const express = require('express');
const router = express.Router();
const { 
    createTradeListing, 
    getAllTradeListings, 
    getTradeListingById, 
    updateTradeListing, 
    deleteTradeListing 
} = require('../controllers/tradeListingController');

// Create Trade Listing
router.post('/', createTradeListing);

// Get All Trade Listings
router.get('/', getAllTradeListings);

// Get Trade Listing by ID
router.get('/:id', getTradeListingById);

// Update Trade Listing
router.put('/:id', updateTradeListing);

// Delete Trade Listing
router.delete('/:id', deleteTradeListing);

module.exports = router;
