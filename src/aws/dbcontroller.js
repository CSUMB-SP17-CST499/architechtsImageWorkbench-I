var AWS = require('aws-sdk');

var config = require('./aws-config');

/*
    This file constructs a DBController object in order to access a DynamoDB
    instance. It pull credentials either from the environment variables of the
    AWS instance, or from a 'credentials.json' file in json/credendials. Each
    function takes in a json file specifying the desired action.

    Currently supported:
      delete, get, put, update
*/

AWS.config = config.config;

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

function defaultCB(err, data, func_name) {
  if (err) {
    console.error('Unable to ' + func_name + ' item. Error JSON: ',
      JSON.stringify(err, null, 2));
  } else {
    console.log(func_name + ' succeeded: ', JSON.stringify(data, null, 2));
  }
};

module.exports = {
  delete: function(params, callback) {
    if (callback == null) callback = defaultCB("delete");
    docClient.delete(params, callback);
  },

  get: function(params, callback) {
    if (callback == null) callback = defaultCB("get");
    docClient.get(params, callback);
  },

  put: function(params, callback) {
    if (callback == null) callback = defaultCB("put");
    docClient.put(params, callback);
  },

  update: function(params, callback) {
    if (callback == null) callback = defaultCB("update");
    docClient.update(params, callback);
  }
}
