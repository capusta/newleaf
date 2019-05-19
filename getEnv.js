'use strict'

const fs = require('fs')

const dotEnvPresent = fs.existsSync('.env')

if (dotEnvPresent){
  if (process.env.NODE_ENV == 'development') {
    // dev present ... nothing to do
    console.log('dev .env exists')
  } else {
    // prod present ... nothing to do
    console.log('prod .env exists')
  }
} else {
  if (process.env.NODE_ENV == 'development') {
    // dev absent ... nothing to do
    console.err('dev .env file missing - try running ansible')
  } else {
    // production
    const gcs = require('@google-cloud/storage')()
    // TODO: handle bucket download
  }
    console.err('.env file missing')
}