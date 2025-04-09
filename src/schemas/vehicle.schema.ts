// src/schemas/vehicle.schema.ts
import Joi from 'joi';

// Query parameters for getting vehicles
export const getVehiclesQuerySchema = Joi.object({
  make: Joi.string().optional(),
  year: Joi.number().integer().optional(),
  vehicleType: Joi.string().valid('car', 'truck', 'motorcycle').optional(),
});

// Params for getting a vehicle by ID
export const getVehicleByIdParamsSchema = Joi.object({
  id: Joi.number().integer().required(),
});

// Schema for creating a vehicle
export const createVehicleSchema = Joi.object({
  plate: Joi.string().required().min(5).max(10),
  userId: Joi.number().integer().required(),
  year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear() + 1)
    .required(),
  make: Joi.string().required(),
  dniOwner: Joi.string().required(),
  dniOwnerType: Joi.string().valid('CC', 'NIT').required(),
  vehicleType: Joi.string().valid('car', 'truck', 'motorcycle').required(),
  line: Joi.string().required(),
  engineDisplacement: Joi.number().integer().min(50).required(),
  serviceType: Joi.string().valid('private', 'public').required(),
  color: Joi.string().required(),
  passengerCapacity: Joi.number().integer().min(1).required(),
  fuelType: Joi.string().valid('gasolina', 'gas', 'diesel').required(),
  registrationDate: Joi.date().required(),
  from: Joi.string().required(),
  engineId: Joi.string().allow(null),
  VIN: Joi.string().allow(null),
  chassisId: Joi.string().allow(null),
});

// Params for updating/deleting a vehicle
export const vehicleIdParamsSchema = Joi.object({
  id: Joi.number().integer().required(),
});

// Schema for updating a vehicle
export const updateVehicleSchema = Joi.object({
  plate: Joi.string().min(5).max(10),
  userId: Joi.number().integer(),
  year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  make: Joi.string(),
  dniOwner: Joi.string(),
  dniOwnerType: Joi.string().valid('CC', 'NIT'),
  vehicleType: Joi.string().valid('car', 'truck', 'motorcycle'),
  line: Joi.string(),
  engineDisplacement: Joi.number().integer().min(50),
  serviceType: Joi.string().valid('private', 'public'),
  color: Joi.string(),
  passengerCapacity: Joi.number().integer().min(1),
  fuelType: Joi.string().valid('gasolina', 'gas', 'diesel'),
  registrationDate: Joi.date(),
  from: Joi.string(),
  engineId: Joi.string().allow(null),
  VIN: Joi.string().allow(null),
  chassisId: Joi.string().allow(null),
}).min(1);
