import prisma from '../app/database';
import fs from 'fs/promises';
import ResponseError from '../error/responseError';
import { CreateProductRequest, ProductResponse } from '../model/productModel';
import { ProductValidation } from '../validation/productValidation';
import { Validation } from '../validation/validation';
import { productIdMatch } from '../helper/productHelper';

export class ProductService {
  static async create(
    req: CreateProductRequest,
    path: any
  ): Promise<ProductResponse> {
    const productRequest = Validation.validate(ProductValidation.CREATE, req);

    const matchSku = await prisma.product.count({
      where: {
        sku: productRequest.sku,
      },
    });

    if (matchSku) {
      await fs.unlink(path);
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
  static async get(id: number): Promise<ProductResponse> {
    const productId = await productIdMatch(id);
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
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

    // if (!product) {
    //   throw new ResponseError(404, 'Product not found');
    // }

    return product!;
  }
}

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
