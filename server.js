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
const dotenv = require('dotenv');
dotenv.config();

const responseTimeLogger = require('./utils/responseTimeLogger');
const routes = require('./routes');
const {initDb} = require('./utils/dbUtils');



const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');


  

var app = express();

app.use(helmet());

app.use(log4js.connectLogger(appLogger,  { level: 'auto' }));

app.use(responseTimeLogger);

app.use(cors());

app.use(bodyParser.urlencoded({limit:'50mb', extended:true}))

app.use(bodyParser.json({limit:'50mb'}));

app.use('/api', routes)


if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
    throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
  }
  
  const checkJwt = jwt({
    // Dynamically provide a signing key based on the [Key ID](https://tools.ietf.org/html/rfc7515#section-4.1.4) header parameter ("kid") and the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
  });
  
  const checkScopes = jwtAuthz(['read:messages']);

  app.get('/api/private', checkJwt, function(req, res) {
    res.json({
      message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });
  });

  
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
