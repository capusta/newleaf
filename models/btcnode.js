var express = require('express')
var router = express.Router()

const bitcoin = require('bitcoinjs-lib')
const bip39 = require('bip39')
const bip32 = require('bip32')

// using random words
const mnemonic = process.env.MNEMONIC
// create a seed
const node = bip32.fromSeed(bip39.mnemonicToSeedSync(mnemonic))
// segwit native electrum compatible
const root_path = "m/84'/0'/0'"

router.get('/sha',function(req,res){
    console.log('logging sha')
    res.end(JSON.stringify({ id: node.identifier.toString('base64') }));
})

// used by app
module.exports.router = router

// attached to all requests
module.exports.node = node