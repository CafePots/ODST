const Order = require('../models/Order');


/**
 * Save an acknowledgement to an order.
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function store(req, res) {
  await Order.updateOne(
    { _id: req.params.id },
    {
      $push: {
        subscriberAcknowledgements: {
          subscriberID: req.body.user.id,
          organizationID: req.body.user.organization,
          timestamp: req.body.timestamp,
        },
      },
    },
  );

  res.status(204).send();
}


module.exports = {
  store,
};
