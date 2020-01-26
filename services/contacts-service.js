const { contactsDb} = require('../db')
 
/*
  * if you need to make calls to additional tables, data stores (Redis, for example), 
  * or call an external endpoint as part of creating the blogpost, add them to this service
*/
const getAllEmployees = async () => {
  try {
    return await contactsDb.getAll();
  } catch(e) {
    throw new Error(e.message)
  }
}
const createEmployee = async (employee) => {
    try {
      return await contactsDb.create(contact);
    } catch(e) {
      throw new Error(e.message)
    }
  }
const getOneEmployee = async (id) => {
    try {
      return await contactsDb.findById(id);
    } catch(e) {
      throw new Error(e.message)
    }
  }
  const updateOneEmployee = async (id, employee) => {
    try {
      return await contactsDb.updateById(id, contact);
    } catch(e) {
      throw new Error(e.message)
    }
  }
  const deleteOneEmployee = async (id) => {
    try {
      return await contactsDb.deleteById(id);
    } catch(e) {
      throw new Error(e.message)
    }
  }
module.exports = {getAllEmployees,getOneEmployee,updateOneEmployee,deleteOneEmployee,createEmployee};