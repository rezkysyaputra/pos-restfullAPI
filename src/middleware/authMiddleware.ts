import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import ResponseError from '../error/responseError';

declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.get('X-API-TOKEN');
    const token = authHeader ? authHeader.split(' ')[1] : null;

    if (!token) {
      throw new ResponseError(401, 'unauthorized');
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    );

    req.user = decoded;
    next();
  } catch (err) {
    throw new ResponseError(401, 'unauthorized');
  }
};

// const verifyRoleUser = (requiredRoles) => async (req, res, next) => {
//   try {
//     const authHeader = req.get('Authorization');
//     const token = authHeader.split(' ')[1];

//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     const userRoles = decoded.role || null;

//     if (requiredRoles !== userRoles) {
//       return res.status(403).json({
//         errors: 'access forbidden',
//       });
//     }

//     next();
//   } catch (err) {
//     return res.status(401).json({
//       errors: 'unauthorized',
//     });
//   }
// };

// export { verifyToken, verifyRoleUser };
