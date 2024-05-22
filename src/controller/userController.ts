import { UserService } from '../service/userService';
import { Request, Response, NextFunction } from 'express';
import { CreateUserRequest, LoginUserRequest } from '../model/userModel';

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
}

// const login = async (req, res, next) => {
//   try {
//     const result = await userService.login(req.body);

//     res.cookie('refreshToken', result.refreshToken, {
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000,
//     });
//     res.status(200).json({
//       token: result.accessToken,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const get = async (req, res, next) => {
//   try {
//     const result = await userService.get(req.user);
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
//     const result = await userService.update(req.user, req.body);

//     res.status(200).json({
//       message: 'success',
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const logout = async (req, res, next) => {
//   try {
//     await userService.logout(req.user);
//     res.status(200).json({
//       message: 'success',
//     });
//   } catch (error) {
//     next(error);
//   }
// };
