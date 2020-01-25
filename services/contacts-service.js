const { contactsDb} = require('../db')
 
/*
  * if you need to make calls to additional tables, data stores (Redis, for example), 
  * or call an external endpoint as part of creating the blogpost, add them to this service
*/
const getAllContacts = async () => {
  try {
    return await contactsDb.getAll();
  } catch(e) {
    throw new Error(e.message)
  }
}
const createContact = async (contact) => {
    try {
      return await contactsDb.createContact(contact);
    } catch(e) {
      throw new Error(e.message)
    }
  }
const getOneContact = async (id) => {
    try {
      return await contactsDb.findOne(id);
    } catch(e) {
      throw new Error(e.message)
    }
  }
  const updateOneContact = async (id, contact) => {
    try {
      return await contactsDb.updateOne(id, contact);
    } catch(e) {
      throw new Error(e.message)
    }
  }
  const deleteOneContact = async (id) => {
    try {
      return await contactsDb.deleteOne(id);
    } catch(e) {
      throw new Error(e.message)
    }
  }
module.exports = {getAllContacts, getOneContact, updateOneContact, deleteOneContact, createContact};