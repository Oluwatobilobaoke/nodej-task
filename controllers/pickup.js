const express = require('express');
const { successResMsg, errorResMsg } = require('../utils/response');

function getDayOfWeek(date) {
  const dayOfWeek = new Date(date).getDay();    
  console.log({dayOfWeek});
  return isNaN(dayOfWeek) ? null : 
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
}


exports.setPickupDate = async (req, res) => {
  try {

    const {serviceRecurrence, pickupDate } = req.body;

   console.log(serviceRecurrence, pickupDate);

    const pickupDay = getDayOfWeek(pickupDate);

    console.log({pickupDay});


  if (pickupDay === null) {
    return errorResMsg(res, 'Date Cannot be Null');
  }

  // Accept pickup date (Mon - Fri)
  if (pickupDay !== 'Monday' && pickupDay !== 'Tuesday' && pickupDay !== 'Wednessday' && pickupDay !== 'Thursday' && pickupDay !== 'Friday') {
    return errorResMsg(res, 400, 'Sorry, you can only pick up during Week days,: Monday - Friday');
  }


  return successResMsg(res, 200, 'Pickup Date Set Successfully');

  } catch (error) {
    return errorResMsg(res, 500, error.message);
  }
}