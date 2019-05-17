const Express = require('express')

var app = Express();
var btcnode = require('./models/btcnode')

'use strict'
require('dotenv').config()

app.set('trust proxy', true)

//app.use(function(req,res,next){
//    req.node = btcnode.node;
//    next();
//    })

app.get("/",(req,res)=>{
    res.json('Hello World')
})

app.get('/ping',function(req,res){
    res.end(JSON.stringify({ sha: btcnode.node.identifier.toString('base64') }));
})

// To be spun off into its own thing
app.use('/factory', btcnode.router);
  
const port = process.env.PORT;
var server = app.listen(port,() => {
    console.log("Listening on "+server.address().port)
})
