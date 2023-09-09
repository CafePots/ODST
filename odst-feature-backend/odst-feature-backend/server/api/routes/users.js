const User = require('../models/User');
const utils = require('../utils');


async function index(req, res) {
  const users = await User.find({});

  res.json(users.map(utils.renameId));
}


module.exports = {
  index,
};
