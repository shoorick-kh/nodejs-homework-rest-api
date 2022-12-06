const { createError } = require('../helpers/createError.js');
const { User } = require('../models/user.js');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

async function auth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const [tokenType, token] = authHeader.split(' ');

  if (tokenType !== 'Bearer' && !token) {
    throw createError(401, 'Not authorized');
  }
  const { _id } = jwt.verify(token, JWT_SECRET);
  const user = await User.findById(_id);

  if (!user || !user.token) {
    throw createError(401, 'Not authorized');
  }
  req.user = user;
  next();
}

module.exports = {
  auth,
};
