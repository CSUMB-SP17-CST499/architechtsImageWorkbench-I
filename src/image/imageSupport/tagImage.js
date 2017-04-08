import AWS from 'aws-sdk';

import { rekConfig } from '../../aws/aws-config';

function tagImage(file) {
  console.log(file);

  AWS.config = rekConfig;
  const rekognition = new AWS.Rekognition();


  const params = {
    Image: {
      S3Object: {
        Bucket: 'testing-uswest2',
        Name: file.name,
      },
    },
    MaxLabels: 123,
    MinConfidence: 75,
  };


  rekognition.detectLabels(params, (err, data) => {
    if (err) {
      console.log(err, err.stack); // an error occurred
    } else {
      for (let i = 0; i < data.Labels.length; i += 1) {
        console.log(`${data.Labels[i].Confidence}   ${data.Labels[i].Name}`);
      }
    }
  });
}

export default tagImage;
