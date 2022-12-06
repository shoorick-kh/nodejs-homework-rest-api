const express = require('express');
const { tryCatchWrapper } = require('../../helpers/tryCatchWrapper.js');
const authControl = require('../../controllers/authControl.js');
const { validationBody } = require('../../middlewares/validation.js');
const { registerSchema, loginSchema } = require('../../schema/schema.js');
const { auth } = require('../../middlewares/auth.js');

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

module.exports = {
  authRouter,
};
