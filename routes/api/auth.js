const express = require('express');
const { tryCatchWrapper } = require('../../middlewares/tryCatchWrapper.js');
const authControl = require('../../controllers/authControl.js');
const { validationBody } = require('../../middlewares/validation.js');
const { registerSchema, loginSchema } = require('../../schema/schema.js');
const { auth } = require('../../middlewares/auth.js');
const { upload } = require('../../middlewares/uploadFile.js');

const authRouter = express.Router();

authRouter.post(
  '/register',
  validationBody(registerSchema),
  tryCatchWrapper(authControl.register),
);
authRouter.post(
  '/login',
  validationBody(loginSchema),
  tryCatchWrapper(authControl.login),
);
authRouter.post(
  '/logout',
  tryCatchWrapper(auth),
  tryCatchWrapper(authControl.logout),
);
authRouter.post(
  '/current',
  tryCatchWrapper(auth),
  tryCatchWrapper(authControl.current),
);
authRouter.patch(
  '/avatars',
  tryCatchWrapper(auth),
  upload.single('avatar'),
  tryCatchWrapper(authControl.changeAvatar),
);

module.exports = {
  authRouter,
};
