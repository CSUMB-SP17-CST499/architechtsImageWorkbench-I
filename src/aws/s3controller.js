import AWS from 'aws-sdk';

import { s3Config } from './aws-config';

AWS.config = s3Config;
const s3 = new AWS.S3();

export default {
  upload(params, options, callback) {
    s3.upload(params, options, callback);
  },
};
