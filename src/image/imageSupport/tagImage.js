import AWS from 'aws-sdk';

import { rekConfig } from '../../aws/aws-config';

function tagImage(file) {
  AWS.config = rekConfig;
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
