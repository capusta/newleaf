const bitcoin = require('bitcoinjs-lib')
const bip39 = require('bip39')
const bip32 = require('bip32')

// using random words
const mnemonic = process.env.MNEMONIC
// create a seed
const node = bip32.fromSeed(bip39.mnemonicToSeedSync(mnemonic))
const path = "m/0'/0/1"

const { address } = bitcoin.payments.p2pkh({ pubkey: node.derivePath(path).publicKey })

console.log(`derived address: ${address}`)