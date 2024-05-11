import express from 'express';
import userController from '../controller/user-controller.js';

const publicRouter = new express.Router();

// USER
publicRouter.post('/register', userController.register);
publicRouter.post('/login', userController.login);

export default publicRouter;
