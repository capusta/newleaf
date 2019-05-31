'use strict'

const fs = require('fs')

const dotEnvPresent = fs.existsSync('.env')

if (!dotEnvPresent){
  if (process.env.NODE_ENV == 'development') {
    // generate .env file by copying .env.example
    fs.copyFile('.env.example','.env',(err)=> {
        if(err) throw err;
        console.info('warning: regenerated dot env')
    })
  } else {
    // production grabs .env from bucket
    const {Storage} = require('@google-cloud/storage');
    const bucketName = `${process.env.GOOGLE_CLOUD_PROJECT}.appspot.com`;
    console.info(`using bucket ${bucketName}`);
    const gcs = new Storage();
    gcs.bucket(bucketName).file('.env').download({ destination: '.env'})
        .then(()=>{
            console.info(`getEnv.js: successfully downloaded .env from ${bucketName}`)
        })
        .catch((e)=>{
            console.error(`getEnv.js: error downloading .env: ${JSON.stringify(e, undefined,2)}`)
        })
  }
} else {
    console.info(`getEnv.js: .env present`)
}
