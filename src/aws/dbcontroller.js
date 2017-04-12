import AWS from 'aws-sdk';

import { dbConfig } from './aws-config';

const ddbcb = require('./dynamo-callbacks');

/*
    This file constructs a DBController object in order to access a DynamoDB
    instance. It pull credentials either from the environment variables of the
    AWS instance, or from a 'credentials.json' file in json/credendials. Each
    function takes in a json file specifying the desired action.

    Currently supported:
      delete, get, put, update
*/

class DBController {
  constructor() {
    AWS.config = dbConfig;
    this.dynamodb = new AWS.DynamoDB();
    this.docClient = new AWS.DynamoDB.DocumentClient();
  }

  delete(params, callback = ddbcb.delete) {
    this.docClient.delete(params, callback);
  }

  get(params, callback = ddbcb.get) {
    this.docClient.get(params, callback);
  }

  getImage(params, callback = ddbcb.get) {
    this.get(params, (err, data) => {
      const image = data;
      delete image.Item.BucketKey;
      callback(err, image);
    });
  }

  put(params, callback = ddbcb.put) {
    this.docClient.put(params, callback);
  }

  putImage(image, callback = ddbcb.put) {
    const params = image;
    params.Item.BucketKey = `${params.Item.Bucket}|${params.Item.Key}`;
    this.put(params, callback);
  }

  update(params, callback = ddbcb.update) {
    this.docClient.update(params, callback);
  }
}

export default DBController;
