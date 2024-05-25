import { Router } from 'express';
import { verifyAccessToken } from '../middleware/authMiddleware';
import { UserController } from '../controller/userController';
// import userController from '../controller/user-controller.js';
// import categoryController from '../controller/category-controller.js';
// import productController from '../controller/product-controller.js';
// import fileUploadMiddleware from '../middleware/fileUploadMiddleware.js';

const privateRoute: Router = Router();

privateRoute.use(verifyAccessToken);

/// USER
privateRoute.get('/api/users', UserController.get);
privateRoute.patch('/api/users', UserController.update);
privateRoute.delete('/api/logout', UserController.logout);

// // CATEGORY
// privateRoute.post(
//   '/categories',
//   verifyRoleUser('ADMIN'),
//   categoryController.create
// );
// privateRoute.get('/categories', categoryController.list);
// privateRoute.get('/categories/:categoryId', categoryController.get);
// privateRoute.patch(
//   '/categories/:categoryId',
//   verifyRoleUser('ADMIN'),
//   categoryController.update
// );
// privateRoute.delete(
//   '/categories/:categoryId',
//   verifyRoleUser('ADMIN'),
//   categoryController.remove
// );

// // PRODUCT
// privateRoute.post(
//   '/products',
//   verifyRoleUser('ADMIN'),
//   fileUploadMiddleware,
//   productController.create
// );
// privateRoute.get('/products/:productId', productController.get);

export default privateRoute;
