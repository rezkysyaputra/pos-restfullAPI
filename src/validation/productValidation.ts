import { z, ZodType } from 'zod';

// const productIdValidation = Joi.number().positive().required();

// export { createProductValidation, productIdValidation };
export class ProductValidation {
  static readonly CREATE: ZodType = z
    .object({
      sku: z.string().max(10),
      name: z.string().max(100),
      price: z.string().transform(parseFloat),
      stock: z.coerce.number().positive(),
      image: z.string().optional(),
      categoryId: z.coerce.number().positive().optional(),
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
