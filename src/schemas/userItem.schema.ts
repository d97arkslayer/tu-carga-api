import Joi from 'joi';

// Schema for creating a user item
export const createUserItemSchema = Joi.object({
  userId: Joi.number().integer().required(),
  category: Joi.string().required(),
  issueDate: Joi.date().allow(null),
  expiryDate: Joi.date().allow(null),
  itemIdentifier: Joi.string().allow(null),
  vehicleType: Joi.string().valid('particular', 'public').required(),
  licenseCategory: Joi.string().valid('A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'C3').required(),
});

// Schema for updating a user item
export const updateUserItemSchema = Joi.object({
  userId: Joi.number().integer(),
  category: Joi.string(),
  issueDate: Joi.date().allow(null),
  expiryDate: Joi.date().allow(null),
  itemIdentifier: Joi.string().allow(null),
  vehicleType: Joi.string().valid('particular', 'public'),
  licenseCategory: Joi.string().valid('A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'C3'),
}).min(1);

// Params schema for user item ID
export const userItemIdParamsSchema = Joi.object({
  id: Joi.number().integer().required(),
});

// Params schema for getting user items by user id
export const userByIdParamsSchema = Joi.object({
  userId: Joi.number().integer().required(),
});

