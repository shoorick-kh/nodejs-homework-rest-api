const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../models/contacts.js');

const { createError } = require('../utils/createError.js');

const getContacts = async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json({ status: 200, contacts: result });
  } catch (error) {
    next(error);
  }
};

const getOneContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw createError(404, 'not found');
    }
    res.json({ status: 200, contact: result });
  } catch (error) {
    next(error);
  }
};

const postContact = async (req, res, next) => {
  try {
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      throw createError(404, 'not found');
    }
    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
};

const putContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await updateContact(contactId, req.body);
    if (!result) {
      throw createError(404, 'not found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getOneContactById,
  postContact,
  deleteContact,
  putContact,
};
