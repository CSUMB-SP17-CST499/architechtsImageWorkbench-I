import dbc from '../../aws/dbcontroller';

function showImage(src, width, height, labels) {
  // ratio of images
  return ({
    src,
    width,
    height,
    labels,
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

function getImages(
  callback,
  shuffle = false,
  TableName = 'Images',
  region = 'us-west-2',
) {
  const params = {
    TableName,
  };

  const images = [];
  dbc.scan(params, (err, data) => {
    if (err) {
      console.error(err, err.stack);
    } else {
      const items = shuffle ? shuffleArr(data.Items) : data.Items;
      items.forEach((image) => {
        const { Bucket, Key, width, height } = image;
        const src = `https://s3-${region}.amazonaws.com/${Bucket}/${Key}`;
        images.push({
          src,
          width,
          height,
          thumbnail: src,
          thumbnailWidth: width,
          thumbnailHeight: height,
        });
      });
    }
    callback(images);
  });
}

export { getImages, showImage, shuffleArr };
