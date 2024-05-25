// import Joi from 'joi';
import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly REGISTER: ZodType = z
    .object({
      username: z.string().max(100),
      fullName: z.string().max(255),
      email: z.string().max(100).email(),
      role: z.enum(['ADMIN', 'CASHIER']),
      password: z.string().max(100),
    })
    .strict();

  static readonly UPDATE: ZodType = z
    .object({
      fullName: z.string().max(255).optional(),
      email: z.string().max(100).email().optional(),
      role: z.enum(['ADMIN', 'CASHIER']).optional(),
      password: z.string().max(100).optional(),
    })
    .strict();

  static readonly LOGIN: ZodType = z
    .object({
      username: z.string().max(100),
      password: z.string().max(100),
    })
    .strict();
}
