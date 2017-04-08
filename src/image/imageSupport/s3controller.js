import AWS from 'aws-sdk';

import { s3Config } from '../../aws/aws-config';

function showImage(src, width = 600, height = 600, aspectRatio = 1.1) {
  // ratio of images
  return ({
    src,
    width,
    height,
    aspectRatio,
    lightboxImage: {
      src,
    },
  });
}

function shuffleArr(a) {
  const b = a;
  for (let i = a.length; i; i -= 1) {
    const j = Math.floor(Math.random() * i);
    [b[i - 1], b[j]] = [b[j], b[i - 1]];
  }
  return b;
}

AWS.config = s3Config;
const s3 = new AWS.S3();

function getImages(callback, Bucket = 'testing-uswest2', shuffle = false, Delimiter = '/') {
  const params = {
    Bucket,
    Delimiter,
  };

  const imgPrefix = `https://s3-${s3Config.region}.amazonaws.com/${Bucket}/`;
  const images = [];
  s3.listObjects(params, (err, data) => {
    if (err) {
      console.error(err, err.stack);
    } else {
      const contents = shuffle ? shuffleArr(data.Contents) : data.Contents;
      contents.forEach((s3Object) => {
        images.push(showImage(`${imgPrefix}${s3Object.Key}`));
      });
    }
    callback(images);
  });
}

export { getImages, showImage, shuffleArr };
