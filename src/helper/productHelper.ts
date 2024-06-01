import prisma from '../app/database';
import ResponseError from '../error/responseError';
import { ProductRequestId } from '../model/productModel';
import { ProductValidation } from '../validation/productValidation';
import { Validation } from '../validation/validation';

export const productIdMatch = async (id: ProductRequestId) => {
  const productId = Validation.validate(ProductValidation.ID, id);

  const product = await prisma.product.count({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new ResponseError(404, 'product not found');
  }
  return productId;
};
