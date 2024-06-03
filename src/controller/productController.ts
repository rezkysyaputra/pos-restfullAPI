import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../service/productService';
import {
  CreateProductRequest,
  CreateProductResponse,
} from '../model/productModel';

export class ProductController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      let request: CreateProductRequest = req.body;
      let path;
      if (req.file) {
        request.image = req.file.filename;
        path = req.file.path;
      }

      console.log(req.file);

      const result: CreateProductResponse = await ProductService.create(
        request,
        path
      );
      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }
}

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
