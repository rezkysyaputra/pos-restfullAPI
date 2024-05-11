import prisma from '../app/database.js';
import ResponseError from '../error/response-error.js';
import {
  createProductValidation,
  productIdValidation,
} from '../joi-validation/product-validation.js';
import validate from '../joi-validation/validation.js';

const productIdMatch = async (id) => {
  const productId = validate(productIdValidation, id);

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

const create = async (request) => {
  const reqData = validate(createProductValidation, request);

  const matchSku = await prisma.product.count({
    where: {
      sku: reqData.sku,
    },
  });

  if (matchSku) {
    throw new ResponseError(400, 'sku already exists');
  }

  const createProduct = await prisma.product.create({
    data: reqData,
    include: {
      category: true,
    },
  });

  return createProduct;
};

const get = async (id) => {
  const productId = await productIdMatch(id);

  const product = await prisma.product.findFirst({
    where: {
      id: productId,
    },
  });

  return product;
};

export default { create, get };
