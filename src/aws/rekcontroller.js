import AWS from 'aws-sdk';

import { rekConfig } from './aws-config';

AWS.config = rekConfig;
const rek = new AWS.Rekognition();

export default {
  detectLabels(params, callback) {
    rek.detectLabels(params, callback);
  },
};
