import express, { Router } from 'express';
import { verifyAccessToken } from '../middleware/authMiddleware';
import { UserController } from '../controller/userController';
import { CategoryController } from '../controller/categoryController';
import { ProductController } from '../controller/productController';
import upload from '../middleware/uploadMiddleware';

const privateRoute: Router = Router();

privateRoute.use(verifyAccessToken);
// privateRoute.use('/uploads', express.static('uploads'));

/// USER
privateRoute.get('/api/users', UserController.get);
privateRoute.patch('/api/users', UserController.update);
privateRoute.delete('/api/logout', UserController.logout);

// CATEGORY
privateRoute.post('/api/categories', CategoryController.create);
privateRoute.get('/api/categories', CategoryController.list);
privateRoute.get('/api/categories/:categoryId', CategoryController.get);
privateRoute.patch('/api/categories/:categoryId', CategoryController.update);
privateRoute.delete('/api/categories/:categoryId', CategoryController.delete);

// PRODUCT
privateRoute.post('/api/products', upload, ProductController.create);
// privateRoute.get('/products/:productId', productController.get);

export default privateRoute;
