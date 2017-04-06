import AWS from 'aws-sdk';

const localCred = require('../../json/credentials.json');

const access = process.env.AWS_ACCESS_KEY_ID || localCred.accessKeyId;
const secret = process.env.AWS_SECRET_ACCESS_KEY || localCred.secretAccessKey;
const dbRegion = 'us-west-1';
const rekRegion = 'us-west-2';
const s3Region = 'us-west-2';

const credentials = new AWS.Credentials(access, secret);

const dbConfig = new AWS.Config({
  credentials,
  region: dbRegion,
});

const rekConfig = new AWS.Config({
  credentials,
  region: rekRegion,
});

const s3Config = new AWS.Config({
  credentials,
  region: s3Region,
});

export { dbConfig, rekConfig, s3Config };
