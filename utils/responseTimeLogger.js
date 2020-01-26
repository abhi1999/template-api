const log4js = require('log4js');
const appLogger = log4js.getLogger();

const logResponseTime=(req, res, next)=> {
    const startHrTime = process.hrtime();
    res.on("finish", () => {
      const elapsedHrTime = process.hrtime(startHrTime);
      const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
      appLogger.info("RESPONSE_TIME:: %s : %fms", req.path, elapsedTimeInMs);
    });
    next();
  }
  
module.exports = logResponseTime;