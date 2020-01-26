const {getDb} = require('../utils/dbUtils');
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;


class dbBasicOperations {
    constructor(collection){
        this._collection = collection;
    }
    getAll(){
        return new Promise( async(resolve, reject)=>{
            const db = await getDb();
            db.collection(this._collection).find({}).toArray(function(err, docs) {
                if (err) {
                  reject(err)
                } else {
                  resolve(docs);
                }
              });
        })
    }
    create(newRecord){
        return new Promise( async(resolve, reject)=>{
            const db = await getDb();
            db.collection(this._collection).insertOne(newRecord, function(err, doc) {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc);
                }
            });
        });
    }
    findById(id){
        return new Promise( async(resolve, reject)=>{
            const db = await getDb();
            db.collection(this._collection).findOne({ _id: new ObjectID(id) }, function(err, doc) {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc);
                }
            });
        });
    }
    updateById(id, record){
        return new Promise( async(resolve, reject)=>{
            const db = await getDb();
            delete updateDoc._id;
            db.collection(this._collection).updateOne({_id: id}, record, function(err, doc) {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc);
                }
            });
        });
    }
    deleteById(id){
        return new Promise( async(resolve, reject)=>{
            const db = await getDb();
            if(!ObjectID.isValid(id)){
                console.log('rejecting')
                reject('Incorrect Object Id');
                return;
            }
            console.log('deleting record - ', new ObjectID(id));
            db.collection(this._collection).deleteOne({_id: new ObjectID(id)}, function(err, result) {
                // console.log('after deleting', err, result)
                if (err) {
                    console.warn('error in deleting')
                    reject(err)
                } else {
                    console.log('resolving delete', result.deletedCount)
                    resolve(result);
                }
            });
        });
    }
}

module.exports=dbBasicOperations