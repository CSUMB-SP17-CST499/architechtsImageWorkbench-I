import AWS from 'aws-sdk';

<<<<<<< HEAD
import { dbconfig } from './aws-config';
=======
import awsconfig from './aws-config';
>>>>>>> pushing config changes and changed code due to style guide. Nodemon is WIP
var ddbcb = require('./DynamoDBCallbacks.js');

/*
    This file constructs a DBController object in order to access a DynamoDB
    instance. It pull credentials either from the environment variables of the
    AWS instance, or from a 'credentials.json' file in json/credendials. Each
    function takes in a json file specifying the desired action.

    Currently supported:
      delete, get, put, update
*/

var DBController = function() {
<<<<<<< HEAD
  AWS.config = dbconfig;
=======
  AWS.config = awsconfig;
>>>>>>> pushing config changes and changed code due to style guide. Nodemon is WIP

  this.dynamodb = new AWS.DynamoDB();
  this.docClient = new AWS.DynamoDB.DocumentClient();
}

DBController.prototype.delete = function(params, callback) {
  if (callback == null) callback = ddbcb.delete;
  this.docClient.delete(params, callback);
}

DBController.prototype.get = function(params, callback) {
  if (callback == null) callback = ddbcb.get;
  this.docClient.get(params, callback);
}

DBController.prototype.put = function(params, callback) {
  if (callback == null) callback = ddbcd.put;
  this.docClient.put(params, callback);
}

DBController.prototype.update = function(params, callback) {
  if (callback == null) callback = ddbcd.update;
  this.docClient.update(params, callback);
}

module.exports = DBController;
