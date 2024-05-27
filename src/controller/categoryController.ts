import { Response, Request, NextFunction } from 'express';
import { CategoryService } from '../service/categoryService';

export class CategoryController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body;
      const result = await CategoryService.create(request);
      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const request = {
        name: req.query.name as string,
        page: req.query.page ? parseInt(req.query.page as string) : undefined,
        size: req.query.size ? parseInt(req.query.size as string) : undefined,
      };
      const result = await CategoryService.list(request);
      res.status(200).json({
        data: result.data,
        paging: result.paging,
      });
    } catch (e) {
      next(e);
    }
  }
}

// const list = async (req, res, next) => {
//   try {
//     const request = {
//       name: req.query.name,
//       page: req.query.page,
//       size: req.query.size,
//     };
//     const result = await categoryService.list(request);
//     res.status(200).json({
//       message: 'success',
//       data: result.data,
//       paging: result.paging,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
// const get = async (req, res, next) => {
//   try {
//     const { categoryId } = req.params;
//     const result = await categoryService.get(categoryId);
//     res.status(200).json({
//       message: 'success',
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const update = async (req, res, next) => {
//   try {
//     const request = req.body;
//     const { categoryId } = req.params;

//     const result = await categoryService.update(categoryId, request);
//     res.status(200).json({
//       message: 'success',
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const remove = async (req, res, next) => {
//   try {
//     const { categoryId } = req.params;

//     const result = await categoryService.remove(categoryId);
//     res.status(200).json({
//       message: result.message,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export default {
//   create,
//   list,
//   get,
//   update,
//   remove,
// };
