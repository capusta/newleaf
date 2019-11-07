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
data.REACT_APP_DEFAULT_SERVICE = "http://localhost:3000"

data.REACT_APP_BASE_SERVICE = data.REACT_APP_DEFAULT_SERVICE

if (!dotEnvPresent){
  if (process.env.NODE_ENV == 'dev') {
    // generate .env file by copying .env.example (or make your own .env file)
    fs.copyFile('.env.example','.env',(err)=> {
      if(err) throw err;
      console.info('getEnv.js: info: dev env regenerating .env')
    })
    setReactVariables(data);
  } else {

    let bucketName;
    // thanks http://gunargessner.com/gcloud-env-vars/
   async function get_data(){
     const response = await fetch(url, {headers: {'Metadata-Flavor': 'Google'}});
     const bucketName = await response.text();
     return bucketName;
   }
    get_data()
      .then(bucketName => {
        data.REACT_APP_GATEWAY_SERVICE = "https://gateway-dot-"+bucketName+".appspot.com"
        data.REACT_APP_WALLET_SERVICE = "https://node-dot-"+bucketName+".appspot.com"
        data.REACT_APP_DEFAULT_SERVICE = "https://default-dot-"+bucketName+".appspot.com"
        data.REACT_APP_BASE_SERVICE = "https://"+bucketName+".appspot.com"

        const {Storage} = require('@google-cloud/storage');
        const gcs = new Storage();
        console.info(`getEnv.js: info: using bucket ${bucketName}`);
        gcs.bucket(`${bucketName}.appspot.com`).file('.env').download({ destination: '.env'})
          .then(()=>{
            // production grabs .env from bucket, which is uploaded by ansible/_setup.sh.j2:9
            console.info(`getEnv.js: info: successfully downloaded .env from ${bucketName}`)
            setReactVariables(data);
          })
          .catch((e)=>{
            console.error(`getEnv.js: error: error downloading .env ${e} from bucket ${bucketName}`)
          })
        })
  }
} else {
    console.info(`getEnv.js: info: .env is present`)
}

function setReactVariables(data) {
  require('dotenv').config()
  var crypto = require('crypto')
  console.info(`getEnv.js: info: writing react routes and env vars`)
  data.REACT_APP_MNEMONIC_TAIL = crypto.createHash('sha256').update(process.env.MNEMONIC).digest('base64');
  Object.keys(data).forEach(key => { fs.appendFileSync('.env.local', `${key}=${data[key]}\n`)})
  console.info(`getEnv.js: info: finished react routing with ${JSON.stringify(data)}`)
  console.info(`getEnv.js: info: React Service Routes Configured`)
}
