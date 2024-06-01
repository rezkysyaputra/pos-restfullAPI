import { Validation } from './../validation/validation';
import {
  CategoryModel,
  CategoryRequestId,
  CategoryResponse,
  CategoryResponseById,
} from '../model/categoryModel';
import { CategoryValidation } from '../validation/categoryValidation';
import prisma from '../app/database';
import ResponseError from '../error/responseError';
import { ListCategoryRequest } from '../model/categoryModel';
import { categoryIdMatch } from '../helper/categoryHelper';

export class CategoryService {
  static async create(req: CategoryModel): Promise<CategoryModel> {
    const category = Validation.validate(CategoryValidation.CATEGORY, req);

    const categoryCount = await prisma.category.count({
      where: {
        name: category.name,
      },
    });

    if (categoryCount) {
      throw new ResponseError(400, 'category already exists');
    }

    const createNewCategory = await prisma.category.create({
      data: category,
    });

    return createNewCategory;
  }

  static async list(req: ListCategoryRequest): Promise<CategoryResponse> {
    const params = Validation.validate(CategoryValidation.LIST, req);

    const skipProduct: number = (params.page! - 1) * params.size!;
    const totalCategories: number = await prisma.category.count({
      where: {
        name: {
          contains: params.name,
        },
      },
    });

    if (!totalCategories) {
      throw new ResponseError(404, 'category not found');
    }

    const categories = await prisma.category.findMany({
      where: {
        name: {
          contains: params.name,
        },
      },
      take: params.size,
      skip: skipProduct,
    });

    if (!categories.length) {
      throw new ResponseError(404, 'category not found');
    }

    return {
      data: categories,
      paging: {
        page: params.page!,
        size: categories.length,
        totalItems: totalCategories,
        totalPages: Math.ceil(totalCategories / params.size!),
      },
    };
  }
  static async get(id: CategoryRequestId): Promise<CategoryResponseById> {
    const categoryId = await categoryIdMatch(id);

    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    return category!;
  }

  static async update(
    id: CategoryRequestId,
    req: CategoryModel
  ): Promise<CategoryResponseById> {
    const categoryId = await categoryIdMatch(id);

    const newData = Validation.validate(CategoryValidation.CATEGORY, req);

    const updateCategory = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: newData,
    });

    return updateCategory;
  }

  static async delete(id: CategoryRequestId): Promise<string> {
    const categoryId = await categoryIdMatch(id);

    const category = await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
    const message: string = `Category ${category.name} has been deleted`;
    return message;
  }
}
