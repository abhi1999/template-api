const { contactsDb} = require('../db')
 
/*
  * if you need to make calls to additional tables, data stores (Redis, for example), 
  * or call an external endpoint as part of creating the blogpost, add them to this service
*/
const getAll = async () => {
  try {
    return await contactsDb.getAll();
  } catch(e) {
    throw new Error(e.message)
  }
}
const create = async (employee) => {
    try {
      return await contactsDb.create(contact);
    } catch(e) {
      throw new Error(e.message)
    }
  }
const getById = async (id) => {
    try {
      return await contactsDb.findById(id);
    } catch(e) {
      throw new Error(e.message)
    }
  }
  const updateById = async (id, employee) => {
    try {
      return await contactsDb.updateById(id, contact);
    } catch(e) {
      throw new Error(e.message)
    }
  }
  const deleteById = async (id) => {
    try {
      return await contactsDb.deleteById(id);
    } catch(e) {
      throw new Error(e.message)
    }
  }
module.exports = {getAll,getById,updateById,deleteById,create};