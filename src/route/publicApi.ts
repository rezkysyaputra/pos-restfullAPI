import { Router } from 'express';
import { UserController } from '../controller/userController';

const publicRouter = Router();

// USER
publicRouter.post('/api/register', UserController.register);
// publicRouter.post('/login', userController.login);

export default publicRouter;
