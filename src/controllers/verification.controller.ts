// src/controllers/verification.controller.ts
import { Request, Response } from 'express';
import User from '@models/User';
import { generateVerificationCode } from '@utils/verification.utils';
import { sendEmailVerificationCode } from '@utils/email.utils';
import { Op } from 'sequelize';

export const sendVerificationCode = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    if (user.isVerified) {
      res.status(400).json({ success: false, error: 'Email already verified' });
      return;
    }

    // Generate a 6-digit verification code
    const verificationCode = generateVerificationCode();

    // Set expiry to 24 hours from now
    const verificationCodeExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Save to user record
    user.verificationCode = verificationCode;
    user.verificationCodeExpires = verificationCodeExpires;
    await user.save();

    // Send verification email
    await sendEmailVerificationCode(user.email, verificationCode, user.name);

    res.status(200).json({
      success: true,
      message: 'Verification code sent to your email',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({
      where: {
        email,
        verificationCode: code,
        verificationCodeExpires: { [Op.gt]: new Date() },
      },
    });

    if (!user) {
      res.status(400).json({
        success: false,
        error: 'Invalid or expired verification code',
      });
      return;
    }

    // Mark as verified and clear verification data
    user.isVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpires = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
