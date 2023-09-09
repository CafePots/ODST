const mongoose = require('mongoose');


const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subscribers: [{
    type: mongoose.Types.ObjectId,
    default: [],
  }],
});


module.exports = mongoose.model('Organization', schema);
