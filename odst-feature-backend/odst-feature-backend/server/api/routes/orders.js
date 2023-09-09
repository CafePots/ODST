const fs = require('fs/promises');
const Order = require('../models/Order');
const utils = require('../utils');


/**
 * List all orders in the system.
 *
 * TODO:
 * Optimize to only show orders that are relevant to a publisher
 * or a subscriber.
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns void
 */
async function index(req, res) {
  const orders = await Order.find({});

  res.json(orders.map(utils.renameId));
}


/**
 * Store a new order in the system.
 *
 * @param {express.Request} req
 * @param {object} req.body
 * @param {object} req.body.opord
 * @param {string} req.body.opord.name
 * @param {string} req.body.opord.extension
 * @param {string} req.body.opord.path
 * @param {string} req.body.opord.src
 * @param {string} req.body.createdBy
 * @param {Date} req.body.createdAt
 * @param {express.Response} res
 * @returns void
 */
async function store(req, res) {
  const order = await Order.create({
    // Information sent from the client.
    opord: req.body.opord,
    createdBy: req.body.createdBy,
    createdAt: req.body.createdAt,

    // Information we initialize on the server.
    status: 'STAFFING',
    attachments: [],
    fragos: [],
    subscriberAcknowledgements: [],
    subscriberActions: [],
  });

  res.json(utils.renameId(order));
}


/**
 * Delete the order from the system.
 *
 * @param {express.Request} req
 * @param {object} req.params
 * @param {string} req.params.id
 * @param {express.Response} res
 * @returns void
 */
async function destroy(req, res) {
  const order = await Order.findOne({ _id: req.params.id });

  if (!order) {
    console.log('Attempted to delete order that was not found:', req.params.id);
    return res.status(204).send();
  }

  // Delete the OPORD on disk.
  await fs.unlink(order.opord.path);

  // Delete all of the attachments on disk.
  for (const attachment of order.attachments) {
    await fs.unlink(attachment.path);
  }

  // Delete all of the FRAGOs on disk.
  for (const frago of order.fragos) {
    await fs.unlink(frago.file.path);
  }

  // Finally, delete the order.
  await Order.deleteOne({ _id: order._id });

  res.status(204).send();
}

async function publishFrago(req, res) {
  await Order.updateOne(
    {
      _id: req.params.id,
      fragos: {
        $elemMatch: {
          _id: req.params.fragoID,
        },
      },
    },
    {
      $set: {
        'fragos.$.status': 'PUBLISHED',
        'fragos.$.publishedBy': req.body.user.id,
        'fragos.$.publishedAt': req.body.timestamp,
      },
    },
  );

  res.status(204).send();
}

async function ackFrago(req, res) {
  await Order.updateOne(
    {
      _id: req.params.id,
      fragos: {
        $elemMatch: {
          _id: req.params.fragoID,
        },
      },
    },
    {
      $push: {
        "fragos.$.subscriberAcknowledgements": {
          userID: req.body.user.id,
          organizationID: req.body.user.organization,
          timestamp: req.body.timestamp,
        },
      },
    },
  );

  res.status(204).send();
}

async function actionFrago(req, res) {
  await Order.updateOne(
    {
      _id: req.params.id,
      fragos: {
        $elemMatch: {
          _id: req.params.fragoID,
        },
      },
    },
    {
      $push: {
        "fragos.$.subscriberActions": {
          userID: req.body.user.id,
          organizationID: req.body.user.organization,
          timestamp: req.body.timestamp,
        },
      },
    },
  );

  res.status(204).send();
}

async function deleteFrago(req, res) {
  await Order.updateOne(
    {
      _id: req.params.id,
    },
    {
      $pull: {
        fragos: {
          _id: req.params.fragoID,
        },
      },
    },
  );

  res.status(204).send();
}


module.exports = {
  index,
  store,
  destroy,
  publishFrago,
  ackFrago,
  actionFrago,
  deleteFrago,
};
