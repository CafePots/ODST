const Order = require('../models/Order');


/**
 * Save an attachment to an order.
 *
 * @param {express.Request} req
 * @param {object} req.params
 * @param {string} req.params.id
 * @param {File} req.file
 * @param {string} req.file.path
 * @param {string} req.file.destination
 * @param {string} req.file.originalname
 * @param {*} res
 */
async function store(req, res) {
  await Order.updateOne(
    { _id: req.params.id },
    {
      $push: {
        fragos: {
          file: req.body.file,
          status: 'STAFFING',
          createdAt: req.body.createdAt,
          createdBy: req.body.createdBys,
          subscriberAcknowlegements: [],
          subscriberActions: [],
        },
      },
    },
  );

  res.status(204).send();
}


module.exports = {
  store,
};
