const express = require('express')

const { contacts } = require('../controllers')
 
const router = express.Router()
 
router.get("/contacts", contacts.getAll);
router.post('/contacts', contacts.createOne);
router.get("/contacts/:id", contacts.getOne);
router.put("/contacts/:id", contacts.updateOne);
router.delete("/contacts/:id", contacts.deleteOne);

module.exports = router