// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import User from '@models/User';
import { generateToken } from '@utils/jwt.utils';
import bcrypt from 'bcryptjs';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
