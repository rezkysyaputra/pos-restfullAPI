import Joi from 'joi';

const registerUserValidation = Joi.object({
  username: Joi.string().max(100).required(),
  full_name: Joi.string().max(255).required(),
  email: Joi.string().max(100).email().required(),
  role: Joi.string().valid('ADMIN', 'CASHIER').required(),
  password: Joi.string().max(100).required(),
});

const loginUserValidation = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
});

const updateUserValidation = Joi.object({
  full_name: Joi.string().max(255).optional(),
  email: Joi.string().max(100).email().optional(),
  role: Joi.string().valid('ADMIN', 'CASHIER').optional(),
  password: Joi.string().max(100).optional(),
});

export { registerUserValidation, loginUserValidation, updateUserValidation };
