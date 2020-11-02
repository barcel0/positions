const Contract = require('../models/contract');
const slugGenerator = require('../helpers/slugGenerator');

const contractChecker = (position, category) => {
  return new Promise((resolve, reject) => {
    if ((category === 'disaggregated' && position.Prod_Merc_Positions_Long_ALL) || (category === 'financial' && position.Dealer_Positions_Long_All)) {


      Contract.findOneAndUpdate(
        { cftcCode: position.CFTC_Contract_Market_Code },
        {
          'category': category,
          'cftcCode': position.CFTC_Contract_Market_Code,
          'name': position.Market_and_Exchange_Names,
          'slug': slugGenerator(position.Market_and_Exchange_Names),
          'lastUpdate': {
            'date': new Date(Date.now()),
            'traders': position.Traders_Tot_All,
            'changeLong': position.Change_in_Tot_Rept_Long_All,
            'changeShort': position.Change_in_Tot_Rept_Short_All,
          }
        },
        { upsert: true, useFindAndModify: false, returnNewDocument: true })
        .then(affectedContract => resolve('Contract created/updated: ' + affectedContract.name))
        .catch(err => resolve(err.message));

    } else {
      resolve('Incorrect contract category: ' + position.Market_and_Exchange_Names + ' is not ' + category);
    }

  });
}
module.exports = contractChecker;