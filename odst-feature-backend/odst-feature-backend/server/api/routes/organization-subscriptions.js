const Organization = require('../models/Organization');


async function store(req, res) {
  await Organization.updateOne(
    { _id: req.params.id },
    { $push: { subscribers: req.body.userID } },
  );

  res.status(204).send();
}

async function destroy(req, res) {
  await Organization.updateOne(
    { _id: req.params.id },
    { $pull: { subscribers: req.body.userID } },
  );

  res.status(204).send();
}


module.exports = {
  store,
  destroy,
};
