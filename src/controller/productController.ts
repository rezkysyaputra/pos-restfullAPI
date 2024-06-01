import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../service/productService';
import {
  CreateProductRequest,
  CreateProductResponse,
} from '../model/productModel';

export class ProductController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateProductRequest = req.body;
      const result: CreateProductResponse = await ProductService.create(
        request
      );
      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }
}

// const create = async (req, res, next) => {
//   try {
//     const request = req.body;
//     request.image = req.file.path;
//     const result = await productService.create(request);

//     res.status(200).json({
//       message: 'success',
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const get = async (req, res, next) => {
//   try {
//     const { productId } = req.params;
//     const result = await productService.get(productId);

//     res.status(200).json({
//       message: 'success',
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export default { create, get };
