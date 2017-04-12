/* eslint-env browser */
import AWS from 'aws-sdk';

import { s3Config } from '../../aws/aws-config';
import dbc from '../../aws/dbcontroller';
import tagImage from './rekognition';

// const dbc = new DBController();

function upload(file) {
  AWS.config = s3Config;
  const s3image = new AWS.S3();
  const Bucket = 'testing-uswest2';
  const Key = file.name;

  const params = {
    Bucket,
    Key,
    Body: file,
    ACL: 'public-read',
  };

  const options = {
    partSize: 10 * 1024 * 1024,
    queueSize: 1,
  };

  s3image.upload(params, options, (err) => {
    if (err) {
      console.error(err, err.stack);
    } else {
      tagImage(file, (err2, data) => { // send to rekognition to tag image
        if (err2) {
          console.error(err2);
          return;
        }
        const imageParams = {
          TableName: 'Images',
          Item: {
            Bucket,
            Key,
            Labels: data.Labels,
          },
        };
        dbc.putImage(imageParams, (err3) => {
          if (err3) console.error(err3);
        });
      });
    }
  });
}

export default upload;
