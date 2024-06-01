import prisma from '../app/database';
import ResponseError from '../error/responseError';
import {
  CreateProductRequest,
  CreateProductResponse,
} from '../model/productModel';
import { ProductValidation } from '../validation/productValidation';
import { Validation } from '../validation/validation';

export class ProductService {
  static async create(
    req: CreateProductRequest
  ): Promise<CreateProductResponse> {
    const productRequest = Validation.validate(ProductValidation.CREATE, req);

    const matchSku = await prisma.product.count({
      where: {
        sku: productRequest.sku,
      },
    });

    if (matchSku) {
      throw new ResponseError(400, 'sku already exists');
    }

    const createProduct = await prisma.product.create({
      data: productRequest,
      select: {
        id: true,
        sku: true,
        name: true,
        price: true,
        stock: true,
        image: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    return createProduct;
  }
}

// const productIdMatch = async (id) => {
//   const productId = validate(productIdValidation, id);

//   const product = await prisma.product.count({
//     where: {
//       id: productId,
//     },
//   });
//   if (!product) {
//     throw new ResponseError(404, 'product not found');
//   }
//   return productId;
// };

// const create = async (request) => {
//   const reqData = validate(createProductValidation, request);

//   const matchSku = await prisma.product.count({
//     where: {
//       sku: reqData.sku,
//     },
//   });

//   if (matchSku) {
//     throw new ResponseError(400, 'sku already exists');
//   }

//   const createProduct = await prisma.product.create({
//     data: reqData,
//     include: {
//       category: true,
//     },
//   });

//   return createProduct;
// };

// const get = async (id) => {
//   const productId = await productIdMatch(id);

//   const product = await prisma.product.findFirst({
//     where: {
//       id: productId,
//     },
//   });

//   return product;
// };

// export default { create, get };
