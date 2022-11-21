const express = require('express');

const router = express.Router();

const { addValidation } = require('../../middlewares/validation.js');

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../models/contacts.js');

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      res.status(404).json({ message: 'Not found' });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', addValidation, async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const result = await addContact(name, email, phone);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      res.status(404).json({ message: 'Not found' });
    }
    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', addValidation, async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await updateContact(contactId, req.body);
    if (!result) {
      res.status(404).json({ message: 'Not found' });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
