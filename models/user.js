const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) next();
  const salt = await bcrypt.genSalt();
  const hashedPass = await bcrypt.hash(user.password, salt);
  user.password = hashedPass;
  next();
});

const User = model('user', userSchema);

module.exports = {
  User,
};
