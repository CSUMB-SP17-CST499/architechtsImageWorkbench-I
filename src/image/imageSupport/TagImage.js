import AWS from 'aws-sdk';

function tagImage(file) {
    console.log(file);

    const localCredentials = require('../../../json/credentials.json');
    let  access = localCredentials.accessKeyId;
    let  secret = localCredentials.secretAccessKey;
    let  region = localCredentials.region;

    const credentials = new AWS.Credentials(access, secret);

  AWS.config.update({
      credentials,
      region
  });

  const rekognition = new AWS.Rekognition();

  var imageTags = new Array();
  var imageConfidence = new Array();

    var params = {
        Image: {
            S3Object: {
              Bucket: "testing-uswest2",
              Name: file.name
            }
        },
        MaxLabels: 123,
        MinConfidence: 75
    };


    rekognition.detectLabels(params, function(err, data) {
        if (err)
            console.log(err, err.stack); // an error occurred
       else {
           for(var i = 0; i < data.Labels.length; i++) {
              imageTags.push(data.Labels[i]["Name"])
              imageConfidence.push(data.Labels[i]["Confidence"])
         }

         sendToDB(file.name, imageTags, imageConfidence);
       }
    });

}

function sendToDB(fileName, tags, confidence){

    const imgPath = 'https://s3-us-west-2.amazonaws.com/testing-uswest2/';

    console.log(fileName)
    console.log(tags);
    console.log(confidence);
    //TODO
      //send to database
      //user fileName, tags, and path
}

const TagImage = {tagImage, sendToDB}
export default TagImage;
