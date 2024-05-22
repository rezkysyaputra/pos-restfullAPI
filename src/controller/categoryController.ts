// import categoryService from '../service/category-service.js';

// const create = async (req, res, next) => {
//   try {
//     const result = await categoryService.create(req.body);
//     res.status(200).json({
//       message: 'success',
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

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
