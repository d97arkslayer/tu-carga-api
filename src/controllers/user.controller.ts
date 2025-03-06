// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import User from '../models/User';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, lastName, phone, email, password } = req.body;
    const user = await User.create({
      name,
      lastName,
      phone,
      email,
      password,
    });

    // Don't return password in response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user.get({ plain: true });

    res.status(201).json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, lastName, phone, email, password } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    await user.update({
      name,
      lastName,
      phone,
      email,
      password,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user.get({ plain: true });

    res.status(200).json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    await user.destroy();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
};
