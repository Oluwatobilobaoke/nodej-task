const express = require('express');


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
    return res.status(400).json({
      status: 'error',
      message: 'Date Cannot be Null'
    })
  }

  // Accept pickup date (Mon - Fri)
  if (pickupDay !== 'Monday' && pickupDay !== 'Tuesday' && pickupDay !== 'Wednessday' && pickupDay !== 'Thursday' && pickupDay !== 'Friday') {
    return res.status(400).json({
      status: 'error',
      message: 'Sorry, you can only pick up during Week days,: Monday - Friday'
    })
  }


  return res.status(200).json({
    status: 'success'
  })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}