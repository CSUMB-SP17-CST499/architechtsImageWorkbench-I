import AWS from 'aws-sdk';

import { rekConfig } from '../../aws/aws-config';

const imageTags = [];
const imageConfidence = [];

function sendToDB(fileName, tags, confidence) {
  const imgPath = 'https://s3-us-west-2.amazonaws.com/testing-uswest2/';

  // testing purposes, will remove after
  console.log(fileName);
  console.log(tags);
  console.log(confidence);
  console.log(imgPath);

  // TODO
  // send to database
  // user fileName, tags, and path
}

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
        imageTags.push(data.Labels[i].Name);
        imageConfidence.push(data.Labels[i].Confidence);
      }
      sendToDB(file.name, imageTags, imageConfidence);
    }
  });
}

export default tagImage;
