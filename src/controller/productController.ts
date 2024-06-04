import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../service/productService';
import { CreateProductRequest, ProductResponse } from '../model/productModel';

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

      const result: ProductResponse = await ProductService.create(
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
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const productId: number = Number(req.params.productId);
      const result = await ProductService.get(productId);

      res.status(200).json({
        message: 'success',
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }
}

// export default { create, get };
