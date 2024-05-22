// import jwt from 'jsonwebtoken';

// const verifyToken = async (req, res, next) => {
//   try {
//     const authHeader = req.get('Authorization');
//     const token = authHeader ? authHeader.split(' ')[1] : null;

//     if (!token) {
//       return res.status(401).json({
//         errors: 'unauthorized',
//       });
//     }

//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({
//       errors: 'unauthorized',
//     });
//   }
// };

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
