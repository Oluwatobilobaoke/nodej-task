const express = require('express');
const cors = require('cors');




// Error handling middleware
const { errorHandler } = require('./error-handler');

const app = express();
// user can select the number of times they want the laundry company to pick up their cloth in a month, create an API that: Accept pickup day (Mon - Fri), Accept service recurrence (4 times, 2 times or once a month), Using today (current day) as the start date, generate the next pickup dates for the subscription


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

const pickupRouter = require('./routes/index');
// Home Route
app.get('/api/v1/home', (req, res) => { 
  return res.status(200).json({
    status: 'success',
    message: 'Welcome to the Laundry API'
  })
})

//   Routes Middleware
app.use('/api/v1/pickup', pickupRouter);


// global error handler
app.use(errorHandler);

module.exports = app;