const express = require('express');

const router = express.Router();

const { addValidation } = require('../../middlewares/validation.js');
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

router.get('/', tryCatchWrapper(getContacts));

router.get('/:contactId', tryCatchWrapper(getOneContactById));

router.post('/', addValidation(postSchema), tryCatchWrapper(postContact));

router.delete('/:contactId', tryCatchWrapper(deleteContact));

router.put(
  '/:contactId',
  addValidation(putSchema),
  tryCatchWrapper(updateContact),
);

router.patch(
  '/:contactId',
  addValidation(putchSchema),
  tryCatchWrapper(updateStatusContact),
);

module.exports = router;
