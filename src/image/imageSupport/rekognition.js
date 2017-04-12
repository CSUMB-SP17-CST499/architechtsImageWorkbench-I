import AWS from 'aws-sdk';

import rek from '../../aws/rekcontroller';


function tagImage(file, callback) {
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

  rek.detectLabels(params, callback);
}

export default tagImage;
