const Order = require('../models/Order');


/**
 * Save an attachment to an order.
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function store(req, res) {
  await Order.updateOne(
    { _id: req.params.id },
    {
      $push: {
        attachments: {
          name: req.body.name,
          extension: req.body.extension,
          path: req.body.path,
          src: req.body.src,
        },
      },
    },
  );

  res.status(204).send();
}


module.exports = {
  store,
};
