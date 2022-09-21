'use strict';

const express = require('express');
require('dotenv').config();
const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const PORT = process.env.PORT || 3002;
const logger = require('./middleware/logger');
const validator = require('./middleware/validator');


// design principle:  singleton
const app = express();
app.use(logger);

app.get('/', (req, res, next) => {
  res.status(200).send('Hello World');
});

app.get('/person', validator);

app.get('/bad', (req, res, next) => {
  next('this is a bad route');
});

app.use('*', notFound);

app.use(errorHandler);

function start(){
  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
}

module.exports = { app, start};
