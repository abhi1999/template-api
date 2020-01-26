const express = require('express')

const { contacts } = require('../controllers')
 
const router = express.Router()
 
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now(), req.url)
    next()
  })

router.get("/contacts", contacts.getAll);
router.post('/contact', contacts.createOne);
router.get("/contact/:id", contacts.getOne);
router.put("/contact/:id", contacts.updateOne);
router.delete("/contact/:id", contacts.deleteOne);

module.exports = router