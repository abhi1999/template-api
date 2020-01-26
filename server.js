const express = require("express");
const bodyParser = require("body-parser");
const log4js = require('log4js');
log4js.configure({
    appenders: {
      console: { type: 'console' },
      file: { type: 'file', filename: 'cheese.log' }
    },
    categories: {
      cheese: { appenders: ['file'], level: 'info' },
      default: { appenders: ['console'], level: 'info' }
    }
   });
const appLogger = log4js.getLogger();
const cors = require('cors');
const helmet = require('helmet');

const routes = require('./routes');
const {initDb} = require('./utils/dbUtils');

var app = express();

app.use(helmet());

app.use(log4js.connectLogger(appLogger,  { level: 'auto' }));

app.use(cors());

app.use(bodyParser.urlencoded({limit:'50mb', extended:true}))

app.use(bodyParser.json({limit:'50mb'}));

initDb().then(()=>{
    // Initialize the app.
    var server = app.listen(process.env.PORT || 8080, function () {
        var port = server.address().port;
        appLogger.info("App now running on port", port);
    });
}).catch((err)=>{
    appLogger.error(err);
    process.exit(1);
})

app.use('/api', routes)
 