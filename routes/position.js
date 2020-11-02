const express = require('express');
const router = express.Router();

const FinancialPosition = require('../models/financialPosition');
const DisaggregatedPosition = require('../models/disaggregatedPosition');
const Contract = require('../models/contract');

// @route GET /api/position
// @desc Get contract positions
// @access Public
router.get('/:category/:contractslug/:type', function (req, res) {
  Contract.findOneAndUpdate({ slug: req.params.contractslug }, { $inc: { hits: 1 } }, { new: true, useFindAndModify: false }, function (err, Contract) {
    if (err) throw err;
    const marketCode = Contract.cftcCode;
    if (marketCode !== '') {
      if (req.params.category === 'financial') {
        FinancialPosition
          .find({
            $and: [
              { CFTC_Contract_Market_Code: marketCode },
              { FutOnly_or_Combined: req.params.type }
            ]
          })
          .sort({ reportDate: 1 })
          .exec(function (err, financialPositions) {
            if (err) throw err;
            res.json(financialPositions);
          }
          );
      } else if (req.params.category === 'disaggregated') {
        DisaggregatedPosition
          .find({
            $and: [
              { CFTC_Contract_Market_Code: marketCode },
              { FutOnly_or_Combined: req.params.type }
            ]
          })
          .sort({ reportDate: 1 })
          .exec(function (err, disaggregatedPositions) {
            if (err) throw err;
            res.json(disaggregatedPositions);
          }
          );
      }
    }
  });
});

module.exports = router;