// backend/routes/tradeRoutes.js
const express = require('express');
const router = express.Router();
const { createTrade, getAllTrades } = require('../controllers/tradeController');

// Create Trade
router.post('/', createTrade);

// Get All Trades
router.get('/', getAllTrades);

// @route   POST /api/trades/request
//router.post('/request', createTradeRequest);


module.exports = router;
