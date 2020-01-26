const { contactsSerivce } = require('../services')
const {handleError} = require('../utils');

const { getAllContacts, getOneContact, updateOneContact, deleteOneContact, createContact } = contactsSerivce
 
/*
 * call other imported services, or same service but different functions here if you need to
*/
const getAll = async (req, res, next) => {
  try {
    let data = await getAllContacts()
    res.status(200).json(data);
    next()
  } catch(e) {
    console.log(e.message)
    handleError(res, e.message, "Failed to get contacts.");
    next(e)
  }
}
const getOne = async (req, res, next) => {
  try {
    const {id} =req.params;
    const data = await getOneContact(id)
    res.status(200).json(data);
    next()
  } catch(e) {
    console.log(e.message)
    handleError(res, e.message, "Failed to get contact.");
    next(e)
  }
}
const updateOne = async (req, res, next) => {
  try {
    const contact = req.body;
    const data = await updateOneContact(id,contact)
    res.status(200).json(data);
    next()
  } catch(e) {
    console.log(e.message)
    handleError(res, e.message, "Failed to get contact.");
    next(e)
  }
}
const deleteOne = async (req, res, next) => {
  try {
    // console.log('iamhere', req.params)
    const {id} =req.params;
    const data = await deleteOneContact(id);
    res.status(200).json(data);
    next()
  } catch(e) {
    // console.log(e.message)
    handleError(res, e.message, "Failed to get contact.");
    next(e)
  }
}
const createOne = async (req, res, next) => {
  try {
    const newContact = req.body;
    newContact.createDate = new Date();
  
    if (!req.body.name) {
      handleError(res, "Invalid user input", "Must provide a name.", 400);
      next(e);
    } else {
      const data = await createContact(newContact);
      res.status(200).json(data);
    next()
    }
  } catch(e) {
    console.log(e.message)
    handleError(res, e.message, "Failed to get contact.");
    next(e);
  }
}
module.exports = { getAll, getOne,createOne, updateOne, deleteOne }