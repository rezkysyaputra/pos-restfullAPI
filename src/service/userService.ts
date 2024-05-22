import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '../app/database';
import ResponseError from '../error/responseError';
import {
  CreateUserRequest,
  LoginUserRequest,
  LoginUserResponse,
  CreateUserResponse,
} from '../model/userModel';
import { Validation } from '../validation/validation';
import { UserValidation } from '../validation/userValidation';

export class UserService {
  static async register(
    request: CreateUserRequest
  ): Promise<CreateUserResponse> {
    // Validate the incoming request
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    );

    // Check if a user with the same username or email already exists
    const checkUsername = await prisma.user.findFirst({
      where: {
        username: registerRequest.username,
      },
    });

    if (checkUsername) {
      throw new ResponseError(400, 'Username already exists');
    }

    const checkEmail = await prisma.user.findFirst({
      where: {
        email: registerRequest.email,
      },
    });

    if (checkEmail) {
      throw new ResponseError(400, 'Email already exists');
    }

    // Hash the password
    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    // Create a new user
    const createNewUser = await prisma.user.create({
      data: registerRequest,
      select: {
        username: true,
        fullName: true,
        email: true,
        role: true,
      },
    });

    return createNewUser;
  }

  static async login(request: LoginUserRequest): Promise<LoginUserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    const matchUser = await prisma.user.findFirst({
      where: {
        username: loginRequest.username,
      },
    });

    if (!matchUser) {
      throw new ResponseError(400, 'username or password wrong');
    }

    const matchPassword = await bcrypt.compare(
      loginRequest.password,
      matchUser.password
    );

    if (!matchPassword) {
      throw new ResponseError(400, 'username or password wrong');
    }

    // Creating a access token
    const accessToken = jwt.sign(
      matchUser,
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: '1h',
      }
    );

    // Creating a refresh token
    const refreshToken = jwt.sign(
      loginRequest,
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: '1d' }
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}

// const login = async (request) => {
//   const reqData = validate(loginUserValidation, request);

//   const usernameMatch = await prisma.user.count({
//     where: {
//       username: reqData.username,
//     },
//   });

//   if (!usernameMatch) {
//     throw new ResponseError(400, 'username or password wrong');
//   }

//   const user = await prisma.user.findFirst({
//     where: {
//       username: reqData.username,
//     },
//   });

//   const passwordMatch = await bcrypt.compare(reqData.password, user.password);

//   if (!passwordMatch) {
//     throw new ResponseError(400, 'username or password wrong');
//   }

//   function generateToken(secretKey, exp) {
//     return jwt.sign({ username: user.username, role: user.role }, secretKey, {
//       expiresIn: exp,
//     });
//   }

//   const accessToken = generateToken(process.env.ACCESS_TOKEN_SECRET, '120s');
//   const refreshToken = generateToken(process.env.REFRESH_TOKEN_SECRET, '1d');

//   await prisma.user.update({
//     where: {
//       username: user.username,
//     },

//     data: {
//       refresh_token: refreshToken,
//     },
//   });

//   return { accessToken, refreshToken };
// };

// const get = async (user) => {
//   const getData = await prisma.user.findFirst({
//     where: {
//       username: user.username,
//     },
//     select: {
//       username: true,
//       full_name: true,
//       email: true,
//       role: true,
//     },
//   });

//   return getData;
// };

// const update = async (user, request) => {
//   const newData = validate(updateUserValidation, request);

//   if (newData.password) {
//     newData.password = await bcrypt.hash(newData.password, 10);
//   }

//   const updateDataUser = await prisma.user.update({
//     where: {
//       username: user.username,
//     },
//     data: newData,
//     select: {
//       username: true,
//       full_name: true,
//       email: true,
//       role: true,
//     },
//   });

//   return updateDataUser;
// };

// const logout = async (user) => {
//   const deleteToken = await prisma.user.update({
//     where: {
//       username: user.username,
//     },
//     data: {
//       refresh_token: null,
//     },
//   });

//   return deleteToken;
// };
