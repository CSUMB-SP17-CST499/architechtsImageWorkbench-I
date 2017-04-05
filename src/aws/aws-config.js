import AWS from 'aws-sdk';

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
