import { z, ZodType } from 'zod';

export class CategoryValidation {
  static readonly CATEGORY: ZodType = z
    .object({
      name: z.string().max(255),
    })
    .strict();

  static readonly LIST: ZodType = z
    .object({
      name: z.string().optional(),
      page: z.number().positive().default(1),
      size: z.number().positive().default(10),
    })
    .strict();

  static readonly ID: ZodType = z.number().positive();
}
