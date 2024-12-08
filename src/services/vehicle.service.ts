import { Vehicle } from '@models/Vehicle';

export const getAllVehicles = async () => {
  return await Vehicle.findAll();
};

export const createVehicle = async (data: {
  make: string;
  model: string;
  year: number;
}) => {
  return await Vehicle.create(data);
};

export const getVehicleById = async (id: number) => {
  const vehicle = await Vehicle.findByPk(id);
  if (!vehicle) {
    throw new Error(`Vehicle with ID ${id} not found`);
  }
  return vehicle;
};

export const updateVehicle = async (
  id: number,
  data: Partial<{
    make: string;
    model: string;
    year: number;
  }>,
) => {
  const vehicle = await Vehicle.findByPk(id);
  if (!vehicle) {
    throw new Error(`Vehicle with ID ${id} not found`);
  }
  return await vehicle.update(data);
};

export const deleteVehicle = async (id: number) => {
  const vehicle = await Vehicle.findByPk(id);
  if (!vehicle) {
    throw new Error(`Vehicle with ID ${id} not found`);
  }
  await vehicle.destroy();
  return { message: `Vehicle with ID ${id} has been deleted` };
};
