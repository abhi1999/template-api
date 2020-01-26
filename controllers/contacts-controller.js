const { contactsSerivce } = require('../services')
const {handleError} = require('../utils');

// const { getAll, getById, updateById, deleteById, create } = contactsSerivce;
 
/*
 * call other imported services, or same service but different functions here if you need to
*/
const getAll = async (req, res, next) => {
  try {
    let data = await contactsSerivce.getAll()
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
    const data = await contactsSerivce.getById(id)
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
    const data = await contactsSerivce.updateById(id,contact)
    res.status(200).json(data);
    next()
  } catch(e) {
    console.log(e.message)
    handleError(res, e.message, "Failed to update contact.");
    next(e)
  }
}
const deleteOne = async (req, res, next) => {
  try {
    const {id} =req.params;
    const data = await contactsSerivce.deleteById(id);
    res.status(200).json(data);
    next()
  } catch(e) {
    console.log(e.message)
    handleError(res, e.message, "Failed to delete contact.");
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
      const data = await contactsSerivce.create(newContact);
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