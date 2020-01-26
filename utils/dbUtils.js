const {DB} = require('../config');
const mongodb = require("mongodb");
const log4js = require('log4js');
const appLogger = log4js.getLogger();

let _db;
const initDb =()=>  {
    return new Promise((resolve, reject)=>{
        if (_db) {
            appLogger.warn("Trying to init DB again!");
            resolve(_db);
        }
        mongodb.MongoClient.connect(DB.CONNECTION_STRING, DB.CONNECTION_OPTIONS,function (err, client) {
            if (err) {
                appLogger.error(err);
                reject(err)
            }
            // Save database object from the callback for reuse.
            _db = client.db();
            appLogger.info("Database connection ready");
            resolve(_db);
        })
    })
}
    
const getDb =()=>{
    return new Promise((resolve, reject)=>{
        if(_db){
            resolve(_db)
        }
        else{
            initDb().then(resolve).catch(reject);
        }
    })
}

module.exports={initDb, getDb}