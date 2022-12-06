const { User } = require('../models/user.js');
const { createError } = require('../helpers/createError.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

async function register(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const newUser = new User({ email, password });
    await newUser.save();
    return res.status(201).json({ user: newUser });
  }
  throw createError(409, `Email in use`);
}

async function login(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, 'Email is wrong');
  }
  const isPassCorrect = await bcrypt.compare(password, user.password);
  if (!isPassCorrect) {
    throw createError(401, 'Password is wrong');
  }
  const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '60m' });
  const userWithToken = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true },
  );
  return res.status(200).json({ user: userWithToken });
}

async function logout(req, res, next) {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, { token: null });
  return res.status(204).json({ user: user });
}

async function current(req, res, next) {
  const { _id } = req.user;
  const user = await User.findById(_id);
  return res
    .status(200)
    .json({ email: user.email, subscription: user.subscription });
}

module.exports = {
  register,
  login,
  logout,
  current,
};
