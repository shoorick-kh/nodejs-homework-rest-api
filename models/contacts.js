const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const findContact = contacts.find(contact => contact.id === contactId);
  if (!findContact) {
    return null;
  }
  return findContact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const removeContact = contacts.find(contact => contact.id === contactId);
  if (!removeContact) {
    return null;
  }
  const contactsAfterRemove = contacts.filter(
    contact => contact.id !== contactId,
  );

  await fs.writeFile(contactsPath, JSON.stringify(contactsAfterRemove));
  return removeContact;
};

const addContact = async body => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = await contacts.findIndex(item => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = await { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
