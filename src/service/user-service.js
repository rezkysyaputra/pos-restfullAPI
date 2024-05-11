import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
} from '../joi-validation/user-validation.js';
import prisma from '../app/database.js';
import validate from '../joi-validation/validation.js';
import ResponseError from '../error/response-error.js';

const register = async (request) => {
  const reqData = validate(registerUserValidation, request);

  const countUser = await prisma.user.count({
    where: {
      username: reqData.username,
    },
  });
  if (countUser) {
    throw new ResponseError(400, 'username already exists');
  }

  const countEmail = await prisma.user.count({
    where: {
      email: reqData.email,
    },
  });
  if (countEmail) {
    throw new ResponseError(400, 'email already exists');
  }

  reqData.password = await bcrypt.hash(reqData.password, 10);

  const createNewUser = await prisma.user.create({
    data: reqData,
    select: {
      username: true,
      full_name: true,
      role: true,
      email: true,
    },
  });

  return createNewUser;
};

const login = async (request) => {
  const reqData = validate(loginUserValidation, request);

  const usernameMatch = await prisma.user.count({
    where: {
      username: reqData.username,
    },
  });

  if (!usernameMatch) {
    throw new ResponseError(400, 'username or password wrong');
  }

  const user = await prisma.user.findFirst({
    where: {
      username: reqData.username,
    },
  });

  const passwordMatch = await bcrypt.compare(reqData.password, user.password);

  if (!passwordMatch) {
    throw new ResponseError(400, 'username or password wrong');
  }

  function generateToken(secretKey, exp) {
    return jwt.sign({ username: user.username, role: user.role }, secretKey, {
      expiresIn: exp,
    });
  }

  const accessToken = generateToken(process.env.ACCESS_TOKEN_SECRET, '120s');
  const refreshToken = generateToken(process.env.REFRESH_TOKEN_SECRET, '1d');

  await prisma.user.update({
    where: {
      username: user.username,
    },

    data: {
      refresh_token: refreshToken,
    },
  });

  return { accessToken, refreshToken };
};

const get = async (user) => {
  const getData = await prisma.user.findFirst({
    where: {
      username: user.username,
    },
    select: {
      username: true,
      full_name: true,
      email: true,
      role: true,
    },
  });

  return getData;
};

const update = async (user, request) => {
  const newData = validate(updateUserValidation, request);

  if (newData.password) {
    newData.password = await bcrypt.hash(newData.password, 10);
  }

  const updateDataUser = await prisma.user.update({
    where: {
      username: user.username,
    },
    data: newData,
    select: {
      username: true,
      full_name: true,
      email: true,
      role: true,
    },
  });

  return updateDataUser;
};

const logout = async (user) => {
  const deleteToken = await prisma.user.update({
    where: {
      username: user.username,
    },
    data: {
      refresh_token: null,
    },
  });

  return deleteToken;
};

export default {
  register,
  login,
  get,
  update,
  logout,
};
