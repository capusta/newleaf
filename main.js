const Express = require('express')

var app = Express();
var btcnode = require('./models/btcnode')

app.set('trust proxy', true)

app.use(function(req,res,next){
    req.node = btcnode.node;
    next();
    })

app.get("/",(req,res)=>{
    res.json('Hello World')
})


app.use('/', btcnode.router);

const port = process.env.PORT;
var server = app.listen(port,() => {
    console.log("Listening on "+server.address().port)
})
