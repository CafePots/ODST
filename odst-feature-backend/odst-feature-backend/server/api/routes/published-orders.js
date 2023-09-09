const Order = require('../models/Order');


/**
 * Save an attachment to an order.
 *
 * @param {express.Request} req
 * @param {object} req.params
 * @param {string} req.params.id
 * @param {object} req.body
 * @param {object} req.body.user
 * @param {string} req.body.user.id
 * @param {string} req.body.user.organization
 * @param {*} res
 */
async function store(req, res) {
  await Order.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: 'PUBLISHED',
        publishedAt: new Date(),
        publishedBy: req.body.user.id,
        publishingOrganization: req.body.user.organization,
      },
    },
  );

  res.status(204).send();
}


module.exports = {
  store,
};
