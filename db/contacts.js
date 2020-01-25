const {getDb} = require('../utils/dbUtils');
const {CONTACTS_COLLECTION} = require('../config');
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;

const getAll =()=>{
    return new Promise( async(resolve, reject)=>{
        const db = await getDb();
        db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
            if (err) {
              reject(err)
            } else {
              resolve(docs);
            }
          });
    })
}
const createContact = (newContact)=>{
    return new Promise( async(resolve, reject)=>{
        const db = await getDb();
        db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
            if (err) {
                reject(err)
            } else {
                resolve(doc);
            }
        });
    });
}
const findOne = (id)=>{
    return new Promise( async(resolve, reject)=>{
        const db = await getDb();
        db.collection(CONTACTS_COLLECTION).findOne({ _id: new ObjectID(id) }, function(err, doc) {
            if (err) {
                reject(err)
            } else {
                resolve(doc);
            }
        });
    });
}
const updateOne = (id, contact)=>{
    return new Promise( async(resolve, reject)=>{
        const db = await getDb();
        delete updateDoc._id;
        db.collection(CONTACTS_COLLECTION).updateOne({_id: new ObjectID(id)}, contact, function(err, doc) {
            if (err) {
                reject(err)
            } else {
                resolve(doc);
            }
        });
    });
}
const deleteOne = (id)=>{
    return new Promise( async(resolve, reject)=>{
        const db = await getDb();
        db.collection(CONTACTS_COLLECTION).deleteOne({_id: new ObjectID(id)}, function(err, result) {
            if (err) {
                reject(err)
            } else {
                resolve(doc);
            }
        });
    });
}
module.exports={getAll, createContact, findOne, updateOne, deleteOne}