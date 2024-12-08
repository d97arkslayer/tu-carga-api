import { Request, Response } from 'express';
import {
  getAllVehicles,
  createVehicle,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from '@services/vehicle.service';

export const getVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await getAllVehicles();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createVehicleHandler = async (req: Request, res: Response) => {
  try {
    const { make, model, year } = req.body;
    const vehicle = await createVehicle({ make, model, year });
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getVehicleHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vehicle = await getVehicleById(Number(id));
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const updateVehicleHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vehicle = await updateVehicle(Number(id), req.body);
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const deleteVehicleHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const message = await deleteVehicle(Number(id));
    res.status(200).json(message);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
