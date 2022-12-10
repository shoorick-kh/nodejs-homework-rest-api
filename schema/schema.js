const Joi = require('joi');

const postSchema = Joi.object({
  name: Joi.string().alphanum().min(2).required(),
  email: Joi.string()
    .pattern(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
    .required(),
  phone: Joi.string()
    .min(3)
    .max(13)
    .pattern(/^[+]?[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/)
    .required(),
  favorite: Joi.boolean().default(false),
});

const putSchema = Joi.object({
  name: Joi.string().alphanum().min(2).required(),
  email: Joi.string().pattern(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  ),
  phone: Joi.string()
    .min(3)
    .max(13)
    .pattern(/^[+]?[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/),
  favorite: Joi.boolean().default(false),
});

const putchSchema = Joi.object({
  name: Joi.string().alphanum().min(2),
  email: Joi.string().pattern(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  ),
  phone: Joi.string()
    .min(3)
    .max(13)
    .pattern(/^[+]?[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/),
  favorite: Joi.boolean().required(),
});

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

const resendVerifySchema = Joi.object({
  email: Joi.string().required(),
});

module.exports = {
  postSchema,
  putSchema,
  putchSchema,
  registerSchema,
  loginSchema,
  resendVerifySchema,
};
