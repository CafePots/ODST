const mongoose = require('mongoose');


/**
 * An attachment is a file that can be attached to an order as a supporting
 * document. It is stored on disk and be accessed by both the publisher and
 * subscribers.
 */
const attachmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  extension: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
});


/**
 * An acknowledgement is an indication from a subscriber to a publisher
 * indicating that they have received an order and that they will perform the
 * steps required to action that order.
 */
const acknowledgementSchema = new mongoose.Schema({
  subscriberID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  organizationID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});


/**
 * An "action" is an indication from a subscriber to a publisher that they have
 * complied with the order and have taken the steps required to complete that
 * order.
 */
const actionedSchema = new mongoose.Schema({
  subscriberID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  organizationID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});


/**
 * A Fragmentary Order (FRAGO) is an amendment or change to the original
 * Operational Order (OPORD). A FRAGO must be acknowledged and actioned just
 * like the original OPORD in order for that OPORD to be considered "actioned".
 */
const fragoSchema = new mongoose.Schema({
  file: attachmentSchema,
  status: {
    type: String,
    required: true,
    enum: ['STAFFING', 'PUBLISHED'],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  publishedAt: {
    type: Date,
  },
  publishedBy: {
    type: mongoose.Types.ObjectId,
  },
  subscriberAcknowledgements: [acknowledgementSchema],
  subscriberActions: [actionedSchema],
});


/**
 * An order is a formal order given from a parent unit to one or more of it's
 * subordinate units. Every order in the system must have one Operation Order
 * (OPORD) that can be received by all units that are subscribed to the parent
 * organization.
 *
 * An order can have multiple attachments that can be used as supporting
 * documents, and can also have multiple FRAGOs that act as amendments to the
 * original OPORD.
 */
const orderSchema = new mongoose.Schema({
  opord: attachmentSchema,
  subscriberAcknowledgements: [acknowledgementSchema],
  subscriberActions: [actionedSchema],
  attachments: [attachmentSchema],
  fragos: [fragoSchema],
  status: {
    type: String,
    enum: ['STAFFING', 'PUBLISHED'],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  publishedBy: {
    type: mongoose.Types.ObjectId,
  },
  publishedAt: {
    type: Date,
  },
  publishingOrganization: {
    type: mongoose.Types.ObjectId,
  },
});


module.exports = mongoose.model('Order', orderSchema);
