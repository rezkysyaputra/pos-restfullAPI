import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

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
    const token = req.get('X-API-TOKEN');

    if (!token) {
      res.status(401).json({
        errors: 'unauthorized',
      });
    }
    const decoded = jwt.verify(
      token as string,
      process.env.ACCESS_TOKEN_SECRET as string
    );

    req.user = decoded;
    next();
  } catch (err: any) {
    res.status(401).json({
      errors: 'unauthorized',
    });
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
