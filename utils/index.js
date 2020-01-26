const log4js = require('log4js');
const appLogger = log4js.getLogger();

const handleError=(res, reason, message, code) =>{
    appLogger.error("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

module.exports={handleError};