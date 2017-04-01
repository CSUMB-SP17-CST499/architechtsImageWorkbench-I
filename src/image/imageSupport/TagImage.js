import AWS from 'aws-sdk';

function tagImage(file) {
    console.log(file);

    let access = process.env.AWS_ACCESS_KEY_ID;
    let secret = process.env.AWS_SECRET_ACCESS_KEY;
    let region = 'us-west-2';

  if (access == null || secret == null) {
    const localCredentials = require('../../../json/credentials.json');
    access = localCredentials.accessKeyId;
    secret = localCredentials.secretAccessKey;
    region = localCredentials.region;
  }

    const credentials = new AWS.Credentials(access, secret);

  AWS.config.update({
      credentials,
      region
  });

  const rekognition = new AWS.Rekognition();


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
               console.log(
                  data.Labels[i]["Confidence"] + "   " + data.Labels[i]["Name"]
              );
         }
       }
    });

}

const TagImage = {tagImage}
export default TagImage;
