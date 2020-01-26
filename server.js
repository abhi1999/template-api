const express = require("express");
const bodyParser = require("body-parser");
const routes = require('./routes');
const {initDb} = require('./utils/dbUtils');

var app = express();
app.use(bodyParser.json());

initDb().then(()=>{
    // Initialize the app.
    var server = app.listen(process.env.PORT || 8080, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
}).catch((err)=>{
    console.log(err);
    process.exit(1);
})

app.use('/api', routes)
 