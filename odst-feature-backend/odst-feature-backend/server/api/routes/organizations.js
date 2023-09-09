const Organization = require('../models/Organization');
const utils = require('../utils');


async function index(req, res) {
  const organizations = await Organization.find({});

  return res.json(organizations.map(utils.renameId));
}


module.exports = {
  index,
};
