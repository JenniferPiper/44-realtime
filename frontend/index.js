'use strict';

const express = require('express');
const app = express();
const httpServer = require('http').Server(app);
require('dotenv').config();


// the frontend server will serve whatever is in the public folder
app.use(express.static('./public'));

httpServer.listen(process.env.PORT, () => {

  console.log('__FRONTEND_SERVER_UP__ on port ', process.env.PORT);
});
