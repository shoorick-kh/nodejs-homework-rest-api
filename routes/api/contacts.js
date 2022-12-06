const express = require('express');

const contactsRouter = express.Router();

const { validationBody } = require('../../middlewares/validation.js');
const {
  postSchema,
  putSchema,
  putchSchema,
} = require('../../schema/schema.js');
const { tryCatchWrapper } = require('../../helpers/tryCatchWrapper.js');

const {
  getContacts,
  getOneContactById,
  postContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require('../../controllers/contactControls.js');

contactsRouter.get('/', tryCatchWrapper(getContacts));

contactsRouter.get('/:contactId', tryCatchWrapper(getOneContactById));

contactsRouter.post(
  '/',
  validationBody(postSchema),
  tryCatchWrapper(postContact),
);

contactsRouter.delete('/:contactId', tryCatchWrapper(deleteContact));

contactsRouter.put(
  '/:contactId',
  validationBody(putSchema),
  tryCatchWrapper(updateContact),
);

contactsRouter.patch(
  '/:contactId',
  validationBody(putchSchema),
  tryCatchWrapper(updateStatusContact),
);

module.exports = contactsRouter;
