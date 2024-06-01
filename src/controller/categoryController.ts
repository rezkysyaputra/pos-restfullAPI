import { Response, Request, NextFunction } from 'express';
import { CategoryService } from '../service/categoryService';
import {
  CategoryModel,
  CategoryResponse,
  CategoryUpdateRequest,
  ListCategoryRequest,
} from '../model/categoryModel';

export class CategoryController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CategoryModel = req.body;
      const result: CategoryModel = await CategoryService.create(request);
      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const request: ListCategoryRequest = {
        name: req.query.name as string,
        page: Number(req.query.page),
        size: Number(req.query.size),
      };
      const result: CategoryResponse = await CategoryService.list(request);
      res.status(200).json({
        data: result.data,
        paging: result.paging,
      });
    } catch (e) {
      next(e);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.params;
      const result: CategoryModel = await CategoryService.get(
        Number(categoryId)
      );
      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CategoryUpdateRequest = req.body;
      const { categoryId } = req.params;
      const result: CategoryModel = await CategoryService.update(
        Number(categoryId),
        request
      );
      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.params;
      const result: string = await CategoryService.delete(Number(categoryId));
      res.status(200).json({
        message: result,
      });
    } catch (e) {
      next(e);
    }
  }
}
