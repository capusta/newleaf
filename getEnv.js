'use strict'

const fs = require('fs')

const dotEnvPresent = fs.existsSync('.env')

if (dotEnvPresent){
  if (process.env.NODE_ENV == 'development') {
    // nothin' to do
    console.log('dev .env exists')
  } else {
    // production
    const gcs = require('@google-cloud/storage')()
    // TODO: handle bucket download
  }
} else {
    console.err('.env file missing')
}