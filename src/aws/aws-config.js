import AWS from 'aws-sdk';

<<<<<<< HEAD
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
=======
let access = process.env.AWS_ACCESS_KEY_ID;
let secret = process.env.AWS_SECRET_ACCESS_KEY;
let region = 'us-west-1';

if (access == null || secret == null) {
  const localCredentials = require('../../json/credentials.json');
  access = localCredentials.accessKeyId;
  secret = localCredentials.secretAccessKey;
  region = localCredentials.region;
}

const credentials = new AWS.Credentials(access, secret);

AWS.config.update({
  credentials,
  region,
});

export default AWS.config;
>>>>>>> pushing config changes and changed code due to style guide. Nodemon is WIP
