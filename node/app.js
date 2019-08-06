var Express = require('express')
var validator = require('validator')
var Ddos = require('ddos')
var ddos = new Ddos({burst: 6, limit: 10});
var router = Express.Router()
var app = Express();
app.use(ddos.express)

'use strict'

// load regular env variables
require('dotenv').config();
// load react-specific variables
require('dotenv').config({path: '.env.local'})

app.set('trust proxy', true);

var fs = require('fs');

const bitcoin = require('bitcoinjs-lib')
const bip39 = require('bip39')
const bip32 = require('bip32')
const QR = require('qrcode')

// using random words
const mnemonic = process.env.MNEMONIC
// create a seed
const node = bip32.fromSeed(bip39.mnemonicToSeedSync(mnemonic))
// segwit native electrum compatible
const root_path = "m/84'/0'/0'"

// collect origins from the rest of our services
var allowedOrigins = [process.env.REACT_APP_DEFAULT_SERVICE, process.env.REACT_APP_WALLET_SERVICE];
if (process.env.CUSTOM_DNS) {
  allowedOrigins = allowedOrigins.concat(process.env.CUSTOM_DNS.split(','))
} else {
    console.info(`node/app.js: info: custom_dns not defined`)
}

app.use(function(req, res, next){
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
       res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
})

router.get('/ping',function(req,res){
    res.end(JSON.stringify({ sha: node.identifier.toString('base64') }));
})

router.get('/:id',function(req,res,next){
    // TODO: implement sanitizing of integers
    if (!validator.isNumeric(req.params.id)) {
      return res.status(400).send();
    }
    console.log(`generating id ${req.params.id}`);
    const derive_path = root_path+"/0/"+req.params.id;
    const address = bitcoin.payments.p2wpkh({ pubkey: node.derivePath(derive_path).publicKey }).address;
    QR.toDataURL(address, function (err, url) {
        if (err){
            next(err)
        } else {
            res.end(JSON.stringify({ id: req.params.id, address: address, data: url.split(':')[1]}));
        }
    })
});

var port = process.env.PORT;

if (process.env.NODE_ENV == 'dev') {
    // in dev we have multiple processes
    const parseArgs = require('minimist') (process.argv.slice(2))
    port = parseArgs.port;
}

app.use(router);
var server = app.listen(port,() => {
    console.log("node/app.js: info: listening on "+server.address().port)
    console.log(`node/app.js: info: using menmonic ${process.env.MNEMONIC}`)
})
