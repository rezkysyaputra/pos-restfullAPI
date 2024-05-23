import ResponseError from '../error/responseError';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

export class RefreshTokenService {
  static refresh(req: Request) {
    try {
      const refreshToken = req.cookies.jwt;

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string,
        (err: any, decoded: any) => {
          if (err) {
            throw new ResponseError(401, 'unauthorized');
          }
          // Correct token we send a new access token
          const accessToken = jwt.sign(
            decoded,
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: '1h' }
          );
          return { accessToken };
        }
      );
    } catch (error) {
      throw new ResponseError(401, 'unauthorized');
    }
  }
}
