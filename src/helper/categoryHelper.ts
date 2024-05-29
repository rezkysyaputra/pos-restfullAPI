import prisma from '../app/database';
import ResponseError from '../error/responseError';
import { CategoryRequestId } from '../model/categoryModel';
import { CategoryValidation } from '../validation/categoryValidation';
import { Validation } from '../validation/validation';

export const categoryIdMatch = async (id: CategoryRequestId) => {
  const categoryId = Validation.validate(CategoryValidation.ID, id);

  const category = await prisma.category.count({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    throw new ResponseError(404, 'category not found');
  }
  return categoryId;
};
