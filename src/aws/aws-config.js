import AWS from 'aws-sdk';

const localCred = require('../../json/credentials.json');

const access = process.env.AWS_ACCESS_KEY_ID || localCred.accessKeyId;
const secret = process.env.AWS_SECRET_ACCESS_KEY || localCred.secretAccessKey;
const dbRegion = 'us-west-1';
const s3Region = 'us-west-2';

const credentials = new AWS.Credentials(access, secret);

const dbconfig = new AWS.Config({
  credentials,
  region: dbRegion,
});

const s3config = new AWS.Config({
  credentials,
  region: s3Region,
});

export { dbconfig, s3config };
