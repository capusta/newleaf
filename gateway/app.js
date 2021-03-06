const Express = require('express')
  
var app = Express();

// no need for this now
//'use strict'
//require('dotenv').config()

app.set('trust proxy', true)

app.get("/",(req,res)=>{
    res.json('Hello World')
})

app.get('/ping',function(req,res){
    res.end(JSON.stringify({ sha: 'none' }));
})

var port = process.env.PORT;

if (process.env.NODE_ENV == 'dev') {
    // in dev we have multiple processes
    const parseArgs = require('minimist') (process.argv.slice(2))
    port = parseArgs.port;
}

var server = app.listen(port,() => {
    console.log("gateway/app.js: listening on "+server.address().port)
})
