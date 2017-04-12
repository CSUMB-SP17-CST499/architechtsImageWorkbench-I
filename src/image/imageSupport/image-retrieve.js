import dbc from '../../aws/dbcontroller';

function showImage(src, width = 600, height = 600) {
  // ratio of images
  return ({
    src,
    width,
    height,
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
  const Bucket = 'testing-uswest2';
  const imgPrefix = `https://s3-${region}.amazonaws.com/${Bucket}/`;
  const images = [];
  dbc.scan(params, (err, data) => {
    if (err) {
      console.error(err, err.stack);
    } else {
      console.log(data);
      const items = shuffle ? shuffleArr(data.Items) : data.Items;
      for (let i = 0; i < items.length; i += 1) {
        const image = items[i];
        images.push(
          showImage(`${imgPrefix}${image.Key}`, image.width, image.height),
        );
      }
    }
    callback(images);
  });
}

export { getImages, showImage, shuffleArr };
