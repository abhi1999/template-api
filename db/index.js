const dbBasic = require('./dbBasic')
const {CONTACTS_COLLECTION, BINGO_COLLECTION} = require('../config');

const contactsDb = new dbBasic(CONTACTS_COLLECTION);
const bingoDb = new dbBasic(BINGO_COLLECTION)
module.exports={contactsDb, dbBasic, bingoDb};