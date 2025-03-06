// src/controllers/password.controller.ts
import { Request, Response } from 'express';
import User from '@models/User';
import crypto from 'crypto';
import { sendPasswordRecoveryEmail } from '@utils/email.utils';
import { generateToken } from '@utils/jwt.utils';

// Request password reset
export const requestPasswordReset = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      // Don't reveal that the user doesn't exist
      res.status(200).json({
        success: true,
        message:
          'If your email is registered, you will receive reset instructions',
      });
      return;
    }

    // Generate reset token (JWT with short expiry)
    const resetToken = generateToken({
      userId: user.id,
      email: user.email,
      purpose: 'password_reset',
    });

    // Store token hash in user record with expiry
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    user.resetPasswordExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    await user.save();

    // Send email
    await sendPasswordRecoveryEmail(user.email, resetToken, user.name);

    res.status(200).json({
      success: true,
      message:
        'If your email is registered, you will receive reset instructions',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Reset password with token
export const resetPassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { token, newPassword } = req.body;

    // Verify token is valid
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with valid token
    const user = await User.findOne({
      where: {
        resetPasswordToken: tokenHash,
        resetPasswordExpires: { $gt: Date.now() },
      },
    });

    if (!user) {
      res
        .status(400)
        .json({ success: false, error: 'Invalid or expired token' });
      return;
    }

    // Update password
    user.password = newPassword; // The User model should hash this before saving
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
