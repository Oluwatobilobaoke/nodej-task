const express = require('express');
const cors = require('cors');

// Error handling middleware
const { errorHandler } = require('./error-handler');
const { successResMsg, errorResMsg } = require('./utils/response');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

const pickupRouter = require('./routes/index');

// Home Route
app.get('/api/v1/home', (req, res) => { 
  return successResMsg(res, 200, 'Welcome to the Laundry API');
})

//   Routes Middleware
app.use('/api/v1/pickup', pickupRouter);


// global error handler
app.use(errorHandler);

module.exports = app;