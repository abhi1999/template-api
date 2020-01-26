const dbBasic = require('./dbBasic')
const {CONTACTS_COLLECTION} = require('../config');

const contactsDb = new dbBasic(CONTACTS_COLLECTION);
module.exports={contactsDb, dbBasic};