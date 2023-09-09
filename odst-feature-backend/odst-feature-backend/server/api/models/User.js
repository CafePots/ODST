const mongoose = require('mongoose');


const schema = new mongoose.Schema({
  tenantId: {
    type: String,
    required: true,
  },
  uniqueId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  rank: {
    type: String,
    required: true,
    enum: [
      // Enlisted
      'PV2',
      'PVT',
      'PFC',
      'SPC',
      'CPL',
      'SGT',
      'SSG',
      'SFC',
      'MSG',
      '1SG',
      'SGM',
      'CSM',
      // Warrant Officer
      'W01',
      'CW2',
      'CW3',
      'CW4',
      'CW5',
      // Commissioned Officer
      '2LT',
      '1LT',
      'CPT',
      'MAJ',
      'LTC',
      'COL',
      'BG',
      'MG',
      'LTG',
      'GEN',
      'GA', // Unlikely
    ]
  },
  roles: [{
    type: String,
    required: true,
    default: [],
    enum: ['PUBLISHER', 'SUBSCRIBER'],
  }],
  organization: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});


module.exports = mongoose.model('User', schema);
