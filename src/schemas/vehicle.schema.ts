import Joi from 'joi';

export const vehicleSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must have at least 3 characters',
    'any.required': 'Name is required',
  }),
  type: Joi.string().valid('car', 'truck', 'motorcycle').required().messages({
    'any.only': 'Type must be one of [car, truck, motorcycle]',
    'any.required': 'Type is required',
  }),
  year: Joi.number()
    .integer()
    .min(1886)
    .max(new Date().getFullYear())
    .required()
    .messages({
      'number.base': 'Year must be a number',
      'number.min': 'Year must be greater than or equal to 1886',
      'number.max': `Year must be less than or equal to ${new Date().getFullYear()}`,
      'any.required': 'Year is required',
    }),
});
