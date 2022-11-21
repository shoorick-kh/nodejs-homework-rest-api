const Joi = require('joi');

const addValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(2).required(),
    email: Joi.string(),
    phone: Joi.string().min(3).max(13).required(),
  });
  const validResult = schema.validate(req.body);
  if (validResult.error) {
    return res.status(400).json({ message: 'missing required name field' });
  }
  next();
};

module.exports = {
  addValidation,
};
