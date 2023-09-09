require('dotenv/config');

const cors = require('cors');
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');

const router = require('./api/router');


/*------------------------------------------------------------------------------
 | Constants
 |------------------------------------------------------------------------------
 |
 */

const server = http.createServer();
const app = express(server);


/*------------------------------------------------------------------------------
 | Global Middleware
 |------------------------------------------------------------------------------
 |
 */

app.use(express.static('public'));
app.use(cors());
app.use(express.json());


/*------------------------------------------------------------------------------
 | Routes
 |------------------------------------------------------------------------------
 |
 */

app.use('/', router);


/*------------------------------------------------------------------------------
 | Database Connection
 |------------------------------------------------------------------------------
 |
 */

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected To MongoDB'))
  .catch(() => console.log('MongoDB Connection Error'));


/*------------------------------------------------------------------------------
 | Server Start
 |------------------------------------------------------------------------------
 |
 */

app.listen(8080, () => {
  console.log('App running on port 8080');
});
