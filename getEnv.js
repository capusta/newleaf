'use strict'

const fs = require('fs');
const fetch = require('node-fetch');

const url = 'http://metadata.google.internal/computeMetadata/v1/project/project-id'

// populate .env file in local development mode and in production Google Apps Engine
const dotEnvPresent = fs.existsSync('.env')

// populate .env.local file in local development mode and in production Google Apps Engine
var data = {}
data.REACT_APP_GATEWAY_SERVICE = 'http://localhost:3001'
data.REACT_APP_WALLET_SERVICE = 'http://localhost:3002'

if (!dotEnvPresent){
  if (process.env.NODE_ENV == 'dev') {
    // generate .env file by copying .env.example (or make your own .env file)
    fs.copyFile('.env.example','.env',(err)=> {
      if(err) throw err;
      console.info('getEnv.js: info: dev env regenerating .env')
    })
    setReactVariables(data);
  } else {
    // production grabs .env from bucket, which is uploaded by ansible/_setup.sh.j2:9
    const {Storage} = require('@google-cloud/storage');
    const bucketName = `${process.env.GOOGLE_CLOUD_PROJECT}.appspot.com`;
    console.info(`using bucket ${bucketName}`);
    const gcs = new Storage();
    gcs.bucket(bucketName).file('.env').download({ destination: '.env'})
        .then(()=>{
            console.info(`getEnv.js: info: successfully downloaded .env from ${bucketName}`)
        })
        .catch((e)=>{
            console.error(`getEnv.js: error: error downloading .env: ${JSON.stringify(e, undefined,2)}`)
        })
  }
} else {
    console.info(`getEnv.js: info: .env is present`)
}

function setReactVariables(data) {
  require('dotenv').config()
  var crypto = require('crypto')
  console.info(`getEnv.js: info: writing react routes and env vars`)
  data.REACT_APP_MNEMONIC_TAIL = crypto.createHash('sha256').update(process.env.MNEMONIC).digest('base64').slice(-10);
  Object.keys(data).forEach(key => { fs.appendFileSync('.env.local', `${key}=${data[key]}\n`)})
  console.info(`getEnv.js: info: finished react routing with ${JSON.stringify(data)}`)
  console.info(`getEnv.js: info: React Service Routes Configured`)
}
