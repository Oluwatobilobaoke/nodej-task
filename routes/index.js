const express = require('express');
const router = express.Router();

const  pickUpController = require('../controllers/pickup');

const validateSchema = require('../validations')

const {
  pickupSchema,
} = require('../validations/pickup');

router.post('/pickup', validateSchema(pickupSchema) ,pickUpController.setPickupDate);


module.exports = router;
