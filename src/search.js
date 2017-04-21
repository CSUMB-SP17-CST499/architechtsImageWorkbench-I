//create search engine via Algolia API

//search engine will search tags/imgs from a created
//json file(or queried from DB) and return imgs with list of tags
//associated with them on the front end.

var algoliasearch = require('algoliasearch');

var client = algoliasearch('VPB3MY0NLI', '85fbec90174f2511544e615d161d6060');

//create json file that holds all images with tags.

var index = client.initIndex('img_NAME');
//var imagesJSON = require('./images.json');

index.saveObject({
  firstname: 'Dog',
  lastname: 'Cat',
  objectID: 'myID2'
}, function(err, content) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(content);
});

// index.addObjects(imagesJSON, function(err, content) {
//   if (err) {
//     console.error(err);
//   }
// });

  // //once I get the json file (or database) i'll be able to search for:
  index.search('dog', function(err, content) {
  console.log(content.hits);
});
  //
  // //this function sets the custom ranking in presenting
  // //the images in the specified order.
  // client.initIndex('img_NAME').setSettings({
  //   "searchableAttributes": [
  //     //"img_url", (maybe not img_url
  //     //since people wouldnt be searching for that)
  //     "tags"
  //   ],
  //   //confidence or the score for rekognition
  //   "customRanking": [
  //     "desc(confidence)"
  //   ]
  // });
