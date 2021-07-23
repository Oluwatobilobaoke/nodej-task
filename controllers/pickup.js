const express = require('express');
const moment = require('moment');
const { successResMsg, errorResMsg } = require('../utils/response');

function getDayOfWeek(date) {
  const dayOfWeek = new Date(date).getDay();    
  console.log({dayOfWeek});
  return isNaN(dayOfWeek) ? null : 
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
}

function convertToReadableDate(date) {
  const readAbleDate = moment(date).format("Do MMMM YY")
  return readAbleDate
}

function getFutureDates(date, occurrence) {
  let datesArray = [];
  // console.log({daysInWeek});

  if (occurrence == 1) {
    let dates = moment(date).add(7, 'days')

    const dateObject = {
      date: dates,
      readable_date: convertToReadableDate(dates)
    };

    datesArray.push(dateObject);
    return datesArray;
  }


  if (occurrence == 2) {
    for (let index = 1; index <= Number(occurrence); index++) {
      console.log({index, occurrence});
      let dates = moment(date).add(index, 'weeks');

      const dateObject = {
        date: dates,
        readable_date: convertToReadableDate(dates)
      };

      datesArray.push(dateObject);
      
    }
    return datesArray;
  }

  if (occurrence == 4) {
    for (let index = 1; index <= Number(occurrence); index++) {
      console.log({index, occurrence});
      let dates = moment(date).add(index, 'weeks');

      const dateObject = {
        date: dates,
        readable_date: convertToReadableDate(dates)
      };

      datesArray.push(dateObject);
      
    }
    return datesArray;
  }

  return dateArray;
}


exports.setPickupDate = async (req, res) => {
  try {

    const {serviceRecurrence, pickupDate } = req.body;

   console.log({serviceRecurrence, pickupDate});

    const pickupDay = getDayOfWeek(pickupDate);

    console.log({pickupDay});


  if (pickupDay === null) {
    return errorResMsg(res, 'Date Cannot be Null');
  }

  // Accept pickup date (Mon - Fri)
  if (pickupDay !== 'Monday' && pickupDay !== 'Tuesday' && pickupDay !== 'Wednessday' && pickupDay !== 'Thursday' && pickupDay !== 'Friday') {
    return errorResMsg(res, 400, 'Sorry, you can only pick up during Week days,: Monday - Friday');
  }

  const pickup_dates = getFutureDates(pickupDate, serviceRecurrence);

  const dataInfo = { message: 'Your Pickup Days', pickupDay, pickup_dates }
  return successResMsg(res, 200, dataInfo);

  } catch (error) {
    return errorResMsg(res, 500, error.message);
  }
}

