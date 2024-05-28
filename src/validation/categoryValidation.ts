import { z, ZodType } from 'zod';

export class CategoryValidation {
  static readonly CATEGORY: ZodType = z.object({
    name: z.string().max(255),
  });

  static readonly LIST: ZodType = z
    .object({
      name: z.string().optional(),
      page: z.number().positive().default(1),
      size: z.number().positive().default(10),
    })
    .strict();

  static readonly ID: ZodType = z.number().positive();
}

// const IdCategoryValidation = Joi.number().positive().required();

// const updateCategoryValidation = Joi.object({
//   name: Joi.string().optional(),
//   categoryId: Joi.number().positive().required(),
// });

// export {
//   reqCategoryValidation,
//   IdCategoryValidation,
//   searchCategoryValidation,
//   updateCategoryValidation,
// };
