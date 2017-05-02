//create search engine via Algolia API

import DBC from './aws/dbcontroller.js';

var algoliasearch = require('algoliasearch');
var _ = require('lodash');
var async = require('async');
const loadCred = require('./json/algoliaKeys.json');
var access = loadCred.appID;
var secret = loadCred.adminKey;
var client = algoliasearch(access, secret);
var index = client.initIndex('img_NAME');

var AWS = require("aws-sdk");

 AWS.config.update({
   accessKeyId:"AKIAIYB2L44I2CRQQQJQ",
   secretAccessKey:"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",
   region:"us-west-1"
 });

var docClient = new AWS.DynamoDB.DocumentClient();

DBC.scan({TableName: "Images"}, function (err, data) {
  if (err) {
             console.log (err);
             //callback(err, null)
         }
          var results = JSON.stringify(data,null,1);

          var obj = JSON.parse(results);

          //console.log("keys of data: "+Object.keys(data['Items']));
          //console.log("length of data: "+Object.keys(data['Items']).length)

          var dataItems = data['Items'];
          var indices = Object.keys(data['Items']);
          var listJSON = [];

          for(var i = 0; i < Object.keys(data['Items']).length; i++){
            data['Items'][i].objectID = i;
            //console.log(data['Items'][i].objectID);
          }


          indices.forEach(function(entry){
              console.log(data['Items']);
              index.addObject(dataItems[entry], function(err, content) {
                if (err) {
                  console.error(err);
                }

              });
              listJSON.push(dataItems[entry]);
          });
});
