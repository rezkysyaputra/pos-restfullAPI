import { UserService } from '../service/userService';
import { Request, Response, NextFunction } from 'express';
import {
  CreateUserRequest,
  LoginUserRequest,
  LoginUserResponse,
  UpdateUserRequest,
  UserResponse,
} from '../model/userModel';
import { User } from '@prisma/client';

declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body;
      const result: UserResponse = await UserService.register(request);
      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginUserRequest = req.body;
      const result: LoginUserResponse = await UserService.login(request);

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
      const user: User = req.user;
      const result: UserResponse = await UserService.get(user);
      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User = req.user;
      const request: UpdateUserRequest = req.body;
      const result: UserResponse = await UserService.update(user, request);
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
      const user: User = req.user;
      const result: string = await UserService.logout(user);
      res.status(200).json({
        message: result,
      });
    } catch (e) {
      next(e);
    }
  }
}
