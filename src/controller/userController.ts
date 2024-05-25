import { UserService } from '../service/userService';
import { Request, Response, NextFunction } from 'express';
import { CreateUserRequest, LoginUserRequest } from '../model/userModel';

declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;
      const result = await UserService.register(request);
      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginUserRequest = req.body as LoginUserRequest;
      const result = await UserService.login(request);

      res.cookie('jwt', result.refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        data: { accessToken: result.accessToken },
      });
    } catch (e) {
      next(e);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      const result = await UserService.get(user);
      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      const request = req.body;
      const result = await UserService.update(user, request);
      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }
  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie('jwt');

      res.status(200).json({
        data: {
          message: 'You have been logged out',
        },
      });
    } catch (e) {
      next(e);
    }
  }
}
