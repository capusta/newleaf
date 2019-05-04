const Express = require('express')

var app = Express();

const bitcoin = require('bitcoinjs-lib')
const bip39 = require('bip39')
const bip32 = require('bip32')

// using random words
const mnemonic = process.env.MNEMONIC
console.log(`using mnemonic: ${mnemonic}`)
// create a seed
const node = bip32.fromSeed(bip39.mnemonicToSeedSync(mnemonic))
// segwit native electrum compatible
const root_path = "m/84'/0'/0'"

// generate the first 10 addresses in electrum wallet
for (var i = 0; i < 5; ++i) {
    const derive_path = root_path+"/0/"+i;
    console.log(bitcoin.payments.p2wpkh({ pubkey: node.derivePath(derive_path).publicKey }).address)
}

app.set('trust proxy', true)

app.get("/",(req,res)=>{
    res.json('Hello World')
})

const port = process.env.PORT;
var server = app.listen(port,() => {
    console.log("Listening on "+server.address().port)
})
