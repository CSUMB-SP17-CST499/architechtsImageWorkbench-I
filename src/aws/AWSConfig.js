var AWS = require('aws-sdk');

var access = process.env.AWS_ACCESS_KEY_ID;
var secret = process.env.AWS_SECRET_ACCESS_KEY;

if (access == null || secret == null) {
  AWS.config.loadFromPath('json/credentials.json');
} else {
  AWS.config.update({
    credentials: new AWS.Credentials(access, secret),
    region: 'us-west-1'
  });
}

module.exports = {
  config: AWS.config
}
