import Joi from 'joi';

// Query parameters for getting maintenances
export const getMaintenancesQuerySchema = Joi.object({
  vehicleId: Joi.number().integer().optional(),
  dateFrom: Joi.date().optional(),
  dateTo: Joi.date().optional(),
});

// Params for getting a maintenance by ID
export const getMaintenanceByIdParamsSchema = Joi.object({
  id: Joi.number().integer().required(),
});

// Schema for creating a maintenance record
export const createMaintenanceSchema = Joi.object({
  vehicleId: Joi.number().integer().required(),
  price: Joi.number().required(),
  type: Joi.string().required(),
  serviceCenter: Joi.string().required(),
  oilChange: Joi.object({
    currentMileage: Joi.number().integer().required(),
    nextMileage: Joi.number().integer().required(),
  }).optional(),
  tireChange: Joi.object({
    lastChangeDate: Joi.date().required(),
    nextChangeDate: Joi.date().required(),
    currentMileage: Joi.number().integer().optional(),
  }).optional(),
  maintenanceItems: Joi.array()
    .items(
      Joi.object({
        description: Joi.string().required(),
        price: Joi.number().required(),
        currentMileage: Joi.number().integer().optional(),
      }),
    )
    .optional(),
});

// Schema for updating a maintenance record
export const updateMaintenanceSchema = Joi.object({
  vehicleId: Joi.number().integer(),
  price: Joi.number(),
  type: Joi.string(),
  serviceCenter: Joi.string(),
  oilChange: Joi.object({
    currentMileage: Joi.number().integer().required(),
    nextMileage: Joi.number().integer().required(),
  }).optional(),
  tireChange: Joi.object({
    lastChangeDate: Joi.date().required(),
    nextChangeDate: Joi.date().required(),
    currentMileage: Joi.number().integer().optional(),
  }).optional(),
  maintenanceItems: Joi.array()
    .items(
      Joi.object({
        description: Joi.string().required(),
        price: Joi.number().required(),
        currentMileage: Joi.number().integer().optional(),
      }),
    )
    .optional(),
}).min(1);

// Params for deleting a maintenance record
export const deleteMaintenanceParamsSchema = Joi.object({
  id: Joi.number().integer().required(),
});
