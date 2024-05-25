import { Router } from 'express';
import { UserController } from '../controller/userController';
import { RefreshTokenController } from '../controller/refreshTokenController';

const publicRouter = Router();

// REFRESH TOKEN
publicRouter.post('/api/refresh', RefreshTokenController.refresh);

// USER
publicRouter.post('/api/register', UserController.register);
publicRouter.post('/api/login', UserController.login);

export default publicRouter;
