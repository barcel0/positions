const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  category: { type: String, required: true},
  cftcCode: { type: String, required: true},
  hits: { type: Number, required: true, default: 0 },
  name: { type: String, required: true},
  slug: { type: String, required: true, default: ''},
  lastUpdate: {
    date: { type: Date, required: true},
    traders: { type: Number, required: true},
    changeLong: { type: Number, required: true},
    changeShort: { type: Number, required: true},
  }
});

const contract = mongoose.model('Contract', contractSchema);
module.exports = contract;