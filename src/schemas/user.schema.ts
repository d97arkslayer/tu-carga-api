// src/schemas/user.schema.ts
import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string(),
  lastName: Joi.string(),
  phone: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(6),
}).min(1);

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const requestPasswordResetSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});

export const verificationCodeRequestSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const verifyEmailSchema = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.string().length(6).required(),
});
