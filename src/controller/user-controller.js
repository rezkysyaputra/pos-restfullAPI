import userService from '../service/userService.js';

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    res.status(200).json({
      message: 'success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      token: result.accessToken,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await userService.get(req.user);
    res.status(200).json({
      message: 'success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await userService.update(req.user, req.body);

    res.status(200).json({
      message: 'success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await userService.logout(req.user);
    res.status(200).json({
      message: 'success',
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  get,
  update,
  logout,
};
