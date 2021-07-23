const Joi = require('joi');

const pickupSchema = Joi.object({
  serviceRecurrence: Joi.number().integer().required(),
  pickupDate: Joi.string().min(1).max(1).required(),
})


module.exports = {
  pickupSchema,
}