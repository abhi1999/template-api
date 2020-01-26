const CONTACTS_COLLECTION = "contacts";
const EMPLOYEES_COLLECTION = "employees";
const JOB_SITES_COLLECTION = "jobSites";


// const DB ={CONNECTION_STRING:process.env.MONGODB_URI || "mongodb://localhost:27017/test", CONNECTION_OPTIONS:{useUnifiedTopology:true }}
const DB ={CONNECTION_STRING:process.env.MONGODB_URI, CONNECTION_OPTIONS:{useUnifiedTopology:true }}

module.exports={CONTACTS_COLLECTION, DB, EMPLOYEES_COLLECTION, JOB_SITES_COLLECTION}