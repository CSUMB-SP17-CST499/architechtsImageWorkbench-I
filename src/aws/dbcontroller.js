import AWS from 'aws-sdk';

import { dbConfig } from './aws-config';

/*
    This file constructs a DBController object in order to access a DynamoDB
    instance. It pull credentials either from the environment variables of the
    AWS instance, or from a 'credentials.json' file in json/credendials. Each
    function takes in a json file specifying the desired action.

    Currently supported:
      delete, get, put, update
*/

AWS.config = dbConfig;
const docClient = new AWS.DynamoDB.DocumentClient();

export default {
  delete(params, callback) {
    docClient.delete(params, callback);
  },

  get(params, callback) {
    docClient.get(params, callback);
  },

  put(params, callback) {
    docClient.put(params, callback);
  },

  putImage(image, callback) {
    const { ...params } = image;
    params.Item.BucketKey = `${params.Item.Bucket}|${params.Item.Key}`;
    this.put(params, callback);
  },

  scan(params, callback) {
    docClient.scan(params, callback);
  },

  update(params, callback) {
    docClient.update(params, callback);
  },
};
