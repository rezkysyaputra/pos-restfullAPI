import { Validation } from './../validation/validation';
// import prisma from '../app/database.js';
// import ResponseError from '../error/responseError.js';
// import {
//   IdCategoryValidation,
//   reqCategoryValidation,
//   searchCategoryValidation,
// } from '../joi-validation/category-validation.js';
// import validate from '../joi-validation/validation.js';

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
}

const categoryIdMatch = async (id: CategoryRequestId) => {
  const categoryId = Validation.validate(CategoryValidation.ID, id);

  const category = await prisma.category.count({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    throw new ResponseError(404, 'category not found');
  }
  return categoryId;
};

// const list = async (request) => {
//   const params = validate(searchCategoryValidation, request);

//   const skipProduct = (params.page - 1) * params.size;
//   const totalCategories = await prisma.category.count({
//     where: {
//       name: {
//         contains: params.name,
//       },
//     },
//   });

//   if (!totalCategories) {
//     throw new ResponseError(404, 'category not found');
//   }

//   const categories = await prisma.category.findMany({
//     where: {
//       name: {
//         contains: params.name,
//       },
//     },
//     take: params.size,
//     skip: skipProduct,
//   });

//   if (!categories.length) {
//     throw new ResponseError(404, 'category not found');
//   }

//   return {
//     data: categories,
//     paging: {
//       page: params.page,
//       size: categories.length,
//       totalItems: totalCategories,
//       totalPages: Math.ceil(totalCategories / params.size),
//     },
//   };
// };

// const get = async (id) => {
//   const categoryId = await categoryIdMatch(id);

//   const category = await prisma.category.findUnique({
//     where: {
//       id: categoryId,
//     },
//   });
//   return category;
// };

// const update = async (id, request) => {
//   const categoryId = await categoryIdMatch(id);

//   const newData = validate(reqCategoryValidation, request);

//   const updateCategory = await prisma.category.update({
//     where: {
//       id: categoryId,
//     },
//     data: newData,
//   });

//   return updateCategory;
// };

// const remove = async (id) => {
//   const categoryId = await categoryIdMatch(id);

//   await prisma.category.delete({
//     where: {
//       id: categoryId,
//     },
//   });

//   return { message: 'success' };
// };

// export default {
//   create,
//   list,
//   get,
//   update,
//   remove,
// };
