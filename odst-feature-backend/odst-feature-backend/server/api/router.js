const path = require('path');
const multer = require('multer')
const { Router } = require('express');

const auth = require('./routes/auth');
const files = require('./routes/files');
const orders = require('./routes/orders');
const orderAttachments = require('./routes/order-attachments');
const orderAcknowledgements = require('./routes/order-acknowledgements');
const orderActions = require('./routes/order-actions');
const orderFragos = require('./routes/order-fragos');
const organizations = require('./routes/organizations');
const organizationSubscriptions = require('./routes/organization-subscriptions');
const publishedOrders = require('./routes/published-orders');
const users = require('./routes/users');

const Order = require('./models/Order');
const Organization = require('./models/Organization');
const User = require('./models/User');

const router = Router();
const upload = multer({
  dest: path.resolve(__dirname, '..', 'public', 'uploads/'),
});


router.post('/auth/check', auth.checkUser);
router.post('/auth/verify', auth.verifyUser);

router.get('/users', users.index);

router.get('/organizations', organizations.index);
router.post('/organizations/:id/subscribers', organizationSubscriptions.store);
router.delete('/organizations/:id/subscribers', organizationSubscriptions.destroy);

router.post('/files', upload.single('file'), files.store);

router.get('/orders', orders.index);
router.post('/orders', orders.store);
router.delete('/orders/:id', orders.destroy);

router.post('/orders/:id/attachments', orderAttachments.store);

router.post('/orders/:id/acknowledgements', orderAcknowledgements.store);

router.post('/orders/:id/actions', orderActions.store);

router.post('/orders/:id/fragos', orderFragos.store);

router.post('/orders/:id/fragos/:fragoID/publish', orders.publishFrago);
router.post('/orders/:id/fragos/:fragoID/acknowledge', orders.ackFrago);
router.post('/orders/:id/fragos/:fragoID/action', orders.actionFrago);
router.delete('/orders/:id/fragos/:fragoID', orders.deleteFrago);

router.post('/orders/:id/publish', publishedOrders.store);


router.get('/seed', async (req, res) => {
  await Order.deleteMany({});
  await Organization.deleteMany({});
  await User.deleteMany({});

  await Organization.create({
    name: 'XVIII ABN Corps',
    subscribers: [],
  });

  await Organization.create({
    name: '82ND ABN DIV',
    subscribers: [],
  });

  res.send('ok');
});


module.exports = router;
