const {DB} = require('../config');
const mongodb = require("mongodb");

let _db;
const initDb =()=>  {
    return new Promise((resolve, reject)=>{
        if (_db) {
            console.warn("Trying to init DB again!");
            resolve(_db);
        }
        mongodb.MongoClient.connect(DB.CONNECTION_STRING, DB.CONNECTION_OPTIONS,function (err, client) {
            if (err) {
                console.log(err);
                reject(err)
            }
            // Save database object from the callback for reuse.
            db = client.db();
            console.log("Database connection ready");
            resolve(db);
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