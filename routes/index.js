const express = require('express')
const {EMPLOYEES_COLLECTION, JOB_SITES_COLLECTION} = require("./../config");
const { contacts, genericController } = require('../controllers')
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

const employee = new genericController(EMPLOYEES_COLLECTION)

router.get("/employees", employee.getAll);
router.post('/employee', employee.create);
router.get("/employee/:id", employee.getById);
router.put("/employee/:id", employee.updateById);
router.delete("/employee/:id", employee.deleteById);


const jobSites = new genericController(JOB_SITES_COLLECTION)

router.get("/jobSites", jobSites.getAll);
router.post('/jobSite', jobSites.create);
router.get("/jobSite/:id", jobSites.getById);
router.put("/jobSite/:id", jobSites.updateById);
router.delete("/jobSite/:id", jobSites.deleteById);


module.exports = router