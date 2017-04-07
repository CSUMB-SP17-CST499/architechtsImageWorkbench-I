var AWS = require('aws-sdk');
var ddbcb = require('./dyanmo-callbacks.js');

/*
    This file constructs a DBController object in order to access a DynamoDB
    instance. It pull credentials either from the environment variables of the
    AWS instance, or from a 'credentials.json' file in json/credendials. Each
    function takes in a json file specifying the desired action.

    Currently supported:
      delete, get, put, update
*/

var DBController = function() {
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
