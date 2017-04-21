//create search engine via Algolia API

var algoliasearch = require('algoliasearch');

const loadCred = require('./json/algoliaKeys.json');
access = loadCred.appID;
secret = loadCred.adminKey;
var client = algoliasearch(access, secret);
var index = client.initIndex('img_NAME');

index.saveObject({
  firstname: 'Dog',
  lastname: 'Cat',
  objectID: 'myID3'
}, function(err, content) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(content);
});

  index.search('dog', function(err, content) {
  console.log(content.hits);
});
