import AWS from 'aws-sdk';

import { rekConfig } from '../../aws/aws-config';

AWS.config = rekConfig;
const rekognition = new AWS.Rekognition();

const defaultCallback = (err, data) => {
  if (err) {
    console.log(err, err.stack); // an error occurred
  } else {
    data.Labels.forEach((label) => {
      console.log(`${label.Confidence}   ${label.Name}`);
    });
  }
};

function tagImage(file, callback = defaultCallback) {
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

  rekognition.detectLabels(params, callback);
}

export default tagImage;
