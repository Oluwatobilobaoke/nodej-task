const Joi = require('joi');

const pickupSchema = Joi.object({
  serviceRecurrence: Joi.number().integer().min(1).max(4).required(),
  pickupDate: Joi.string().required(),
})


module.exports = {
  pickupSchema,
}