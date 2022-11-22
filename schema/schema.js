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
});

const putSchema = Joi.object({
  name: Joi.string().alphanum().min(2).required(),
  email: Joi.string().pattern(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  ),
  phone: Joi.string()
    .min(3)
    .max(13)
    .pattern(/^[+]?[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/)
    .required(),
});

module.exports = {
  postSchema,
  putSchema,
};
