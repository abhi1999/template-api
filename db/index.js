const dbBasic = require('./dbBasic')
const {CONTACTS_COLLECTION, EMPLOYEES_COLLECTION} = require('../config');


const employeesDb = new dbBasic(EMPLOYEES_COLLECTION);
const contactsDb = new dbBasic(CONTACTS_COLLECTION);
module.exports={contactsDb, employeesDb};