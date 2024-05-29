import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '../app/database';
import ResponseError from '../error/responseError';
import {
  CreateUserRequest,
  LoginUserRequest,
  LoginUserResponse,
  token,
  UpdateUserRequest,
  UserResponse,
} from '../model/userModel';
import { Validation } from '../validation/validation';
import { UserValidation } from '../validation/userValidation';
import { User } from '@prisma/client';

export class UserService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
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
      loginRequest,
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

  static async get(user: User): Promise<UserResponse> {
    const getUser = await prisma.user.findFirst({
      where: {
        username: user.username,
      },
      select: {
        username: true,
        fullName: true,
        email: true,
        role: true,
      },
    });

    if (!getUser) {
      throw new ResponseError(404, 'User not found');
    }
    return getUser;
  }

  static async update(
    user: User,
    req: UpdateUserRequest
  ): Promise<UserResponse> {
    const newUserData = Validation.validate(UserValidation.UPDATE, req);

    if (newUserData.password) {
      newUserData.password = await bcrypt.hash(newUserData.password, 10);
    }

    const updateUserData = await prisma.user.update({
      where: {
        username: user.username,
      },
      data: newUserData,
      select: {
        username: true,
        fullName: true,
        email: true,
        role: true,
      },
    });

    return updateUserData;
  }
  static async logout(user: User): Promise<string> {
    const message: string = `User ${user.username} logged out`;
    return message;
  }
}

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
