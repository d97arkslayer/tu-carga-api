import Joi from 'joi';

// Schema for creating a vehicle item
export const createVehicleItemSchema = Joi.object({
  vehicleId: Joi.number().integer().required(),
  type: Joi.string().required(),
  issueDate: Joi.date().allow(null),
  expiryDate: Joi.date().allow(null),
  itemIdentifier: Joi.string().allow(null),
  cost: Joi.number().allow(null),
});

// Schema for updating a vehicle item
export const updateVehicleItemSchema = Joi.object({
  vehicleId: Joi.number().integer(),
  type: Joi.string(),
  issueDate: Joi.date().allow(null),
  expiryDate: Joi.date().allow(null),
  itemIdentifier: Joi.string().allow(null),
  cost: Joi.number().allow(null),
}).min(1);

// Params schema for vehicle item ID
export const vehicleItemIdParamsSchema = Joi.object({
  id: Joi.number().integer().required(),
});

// Params schema for getting vehicle items by vehicle id
export const vehicleByIdParamsSchema = Joi.object({
  vehicleId: Joi.number().integer().required(),
});
