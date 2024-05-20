import Joi from 'joi';
import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    username: z.string().max(100),
    full_name: z.string().max(255),
    email: z.string().max(100).email(),
    role: z.enum(['ADMIN', 'CASHIER']),
    password: z.string().max(100),
  });
}

const registerUserValidation = Joi.object({
  username: Joi.string().max(100).required(),
  full_name: Joi.string().max(255).required(),
  email: Joi.string().max(100).email().required(),
  role: Joi.string().valid('ADMIN', 'CASHIER').required(),
  password: Joi.string().max(100).required(),
});

const loginUserValidation = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
});

const updateUserValidation = Joi.object({
  full_name: Joi.string().max(255).optional(),
  email: Joi.string().max(100).email().optional(),
  role: Joi.string().valid('ADMIN', 'CASHIER').optional(),
  password: Joi.string().max(100).optional(),
});

export { registerUserValidation, loginUserValidation, updateUserValidation };
