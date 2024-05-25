import ResponseError from '../error/responseError';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

export class RefreshTokenService {
  static refresh(req: Request) {
    try {
      const refreshToken = req.cookies.jwt;
      const accessToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string,
        (err: any, decoded: any) => {
          if (err) {
            throw new ResponseError(401, 'unauthorized');
          }
          // Correct token we send a new access token
          const newToken = jwt.sign(
            { username: decoded.username, password: decoded.password },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: '1h' }
          );
          return newToken;
        }
      );
      return { accessToken };
    } catch (error) {
      throw new ResponseError(401, 'unauthorized');
    }
  }
}
