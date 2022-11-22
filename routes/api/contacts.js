const express = require('express');

const router = express.Router();

const { addValidation } = require('../../middlewares/validation.js');
const { postSchema, putSchema } = require('../../schema/schema.js');

const {
  getContacts,
  getOneContactById,
  postContact,
  deleteContact,
  putContact,
} = require('../../controllers/contactControls.js');

router.get('/', getContacts);

router.get('/:contactId', getOneContactById);

router.post('/', addValidation(postSchema), postContact);

router.delete('/:contactId', deleteContact);

router.put('/:contactId', addValidation(putSchema), putContact);

module.exports = router;
