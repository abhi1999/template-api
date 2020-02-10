const {getDb} = require('../utils/dbUtils');
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;
const log4js = require('log4js');
const appLogger = log4js.getLogger();

class dbBasicOperations {
    constructor(collection){
        appLogger.info('DB Basic Opertaions for-'+ collection)
        this._collection = collection;
        this.getAll = this.getAll.bind(this);
        this.findById = this.findById.bind(this);
        this.updateById = this.updateById.bind(this);
        this.deleteById = this.deleteById.bind(this);
        this.create = this.create.bind(this);
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
            // console.log('inDB', this._collection, newRecord)
            db.collection(this._collection).insertOne(newRecord, function(err, doc) {
                if (err) {
                    console.error('inDB error',err)
                    reject(err)
                } else {
                    resolve(doc);
                }
            });
        });
    }
    findById(id){
        return new Promise( async(resolve, reject)=>{
            if(!ObjectID.isValid(id)){
                appLogger.warn('Invalid Id')
                reject('Incorrect Object Id');
                return;
            }
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
            if(!ObjectID.isValid(id)){
                appLogger.warn('Invalid Id')
                reject('Incorrect Object Id');
                return;
            }
            const db = await getDb();
            delete record._id;
            delete record.creatDate;

            console.log('RECORD BEING UPDATED -' +this._collection +" ",{ _id: new ObjectID(id) }, record)
            db.collection(this._collection).updateOne({ _id: new ObjectID(id) },{"$set": record}, function(err, doc) {
                if (err) {
                    console.error('WHY AM I HERE', err)
                    reject(err)
                } else {
                    resolve(doc);
                }
            });
        });
    }
    deleteById(id){
        return new Promise( async(resolve, reject)=>{
            if(!ObjectID.isValid(id)){
                appLogger.warn('Invalid Id')
                reject('Incorrect Object Id');
                return;
            }
            const db = await getDb();
            appLogger.info('deleting record - ', new ObjectID(id));
            db.collection(this._collection).deleteOne({_id: new ObjectID(id)}, function(err, result) {
                if (err) {
                    appLogger.warn('error in deleting')
                    reject(err)
                } else {
                    appLogger.info('resolving delete', result.deletedCount)
                    resolve(result);
                }
            });
        });
    }
}

module.exports=dbBasicOperations