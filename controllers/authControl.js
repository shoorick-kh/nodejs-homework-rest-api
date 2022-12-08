const { User } = require('../models/user.js');
const { createError } = require('../middlewares/createError.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs/promises');
const jimp = require('jimp');

const { JWT_SECRET } = process.env;

async function register(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const avatarURL = gravatar.url(email);
    const newUser = new User({ email, password, avatarURL });
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

async function changeAvatar(req, res, next) {
  await jimp
    .read(req.file.path)
    .then(file => file.resize(250, 250).write(req.file.path))
    .catch(error => console.log(error.message));

  const { _id } = req.user;
  const newAvatarName = _id + req.file.filename;
  const newPath = path.join(__dirname, '../public/avatars', newAvatarName);
  const avatarURL = path.join('avatars', newAvatarName);
  await fs.rename(req.file.path, newPath);
  const user = await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });

  return res.status(200).json({ avatarURL: user.avatarURL });
}

module.exports = {
  register,
  login,
  logout,
  current,
  changeAvatar,
};
