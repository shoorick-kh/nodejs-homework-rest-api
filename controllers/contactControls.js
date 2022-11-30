const { Contact } = require('../models/contacts.js');
const { createError } = require('../helpers/createError.js');

const getContacts = async (req, res, next) => {
  const data = await Contact.find();
  res.json({ status: 200, contacts: data });
};

const getOneContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await Contact.findById(contactId);
  if (data) {
    res.status(200).json({ status: 200, contact: data });
  }
  next(createError(404, 'Not found'));
};

const postContact = async (req, res, next) => {
  const createdContact = await Contact.create(req.body);
  res.status(201).json(createdContact);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await Contact.findById(contactId);
  if (data) {
    await Contact.findByIdAndDelete(contactId);
    res.status(200).json({ message: 'contact deleted' });
  }
  return next(createError(404, 'Not found'));
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  const data = await Contact.findByIdAndUpdate(contactId, req.body);
  if (data) {
    const newData = await Contact.findById(contactId);
    res.json(newData);
  }
  return next(createError(404, 'Not found'));
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const favorite = req.body;
  console.log(req.body);
  if (favorite) {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      favorite,
      {
        new: true,
      },
    );
    res.status(200).json(updatedContact);
  }
  res.status(400).json({ message: 'missing field favorite' });
  return next(createError(404, 'Not found'));
};

module.exports = {
  getContacts,
  getOneContactById,
  postContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
