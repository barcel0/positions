const express = require('express');
const router = express.Router();
const Contract = require('../models/contract');

// @route GET /api/contract
// @desc Get all contracts
// @access Public
router.get('/', function (req, res) {
  Contract.find({}).sort({ name: 1 }).exec(function (err, allContracts) {
    if (err) throw err;
    res.json(allContracts);
  });
});

// @route GET /api/contract/top
// @desc Get top 5 contracts by hits
// @access Public
router.get('/top', (req, res) => {
  Contract.find({}).sort({ hits: -1 }).limit(5).exec(function (err, topContracts) {
    if (err) throw err;
    res.json(topContracts)
  })
})

module.exports = router;