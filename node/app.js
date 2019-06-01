var Express = require('express')
var router = Express.Router()
var app = Express();

'use strict'
require('dotenv').config();

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

router.get('/ping',function(req,res){
    res.end(JSON.stringify({ sha: node.identifier.toString('base64') }));
})

router.get('/:id',function(req,res,next){
    // TODO: implement sanitizing of integers
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

if (process.env.NODE_ENV == 'development') {
    // in dev we have multiple processes
    const parseArgs = require('minimist') (process.argv.slice(2))
    port = parseArgs.port;
}

app.use(router);
var server = app.listen(port,() => {
    console.log("Listening on "+server.address().port)
    console.log(`using menmonic ${process.env.MNEMONIC}`)
})
