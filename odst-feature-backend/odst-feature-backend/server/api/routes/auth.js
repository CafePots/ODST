const User = require('../models/User');
const utils = require('../utils');


async function checkUser(req, res) {
  const user = await User.findOne({
    tenantId: req.body.tenantId,
    uniqueId: req.body.uniqueId,
  });

  if (!user) {
    return res.json(null);
  }

  return res.json(utils.renameId(user));
}

async function verifyUser(req, res) {
  const user = await User.create({
    tenantId: req.body.msalUser.tenantId,
    uniqueId: req.body.msalUser.uniqueId,
    firstName: req.body.additionalInfo.firstName,
    lastName: req.body.additionalInfo.lastName,
    email: req.body.additionalInfo.email,
    rank: req.body.additionalInfo.rank,
    organization: req.body.additionalInfo.organization,
    roles: req.body.additionalInfo.roles,
  });

  return res.json(utils.renameId(user));
}


module.exports = {
  checkUser,
  verifyUser,
};
