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

function getImages(callback, shuffle = false, TableName = 'Images') {
  const params = {
    TableName,
  };

  const region = 'us-west-2';
  let imgPrefix;
  const images = [];
  dbc.scan(params, (err, data) => {
    if (err) {
      console.error(err, err.stack);
    } else {
      const items = shuffle ? shuffleArr(data.Items) : data.Items;
      items.forEach((image) => {
        imgPrefix = `https://s3-${region}.amazonaws.com/${image.Bucket}/`;
        images.push(
          showImage(`${imgPrefix}${image.Key}`, image.width, image.height, image.Labels),
        );
      });
    }
    callback(images);
  });
}

export { getImages, showImage, shuffleArr };
