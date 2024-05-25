import { Request, Response, NextFunction } from 'express';
import { RefreshTokenService } from '../service/refreshTokenService';

export class RefreshTokenController {
  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const result = RefreshTokenService.refresh(req);
      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }
}
