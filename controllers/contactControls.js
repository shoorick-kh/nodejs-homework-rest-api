const { Contact } = require('../models/contacts.js');
const { createError } = require('../helpers/createError.js');

const getContacts = async (req, res, next) => {
  const data = await Contact.find();
  res.json({ status: 200, contacts: data });
};

const getOneContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await Contact.findById(contactId);
  if (!data) {
    throw createError(404, 'Not found');
  }
  res.status(200).json({ status: 200, contact: data });
};

const postContact = async (req, res, next) => {
  const createdContact = await Contact.create(req.body);
  res.status(201).json(createdContact);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndDelete(contactId);
  if (!data) {
    throw createError(404, 'Not found');
  }
  res.status(200).json({ message: 'contact deleted' });
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  const data = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!data) {
    throw createError(404, 'Not found');
  }
  res.json(data);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  const data = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!data) {
    throw createError(404, 'Not found');
  }
  res.json(data);
};

module.exports = {
  getContacts,
  getOneContactById,
  postContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
