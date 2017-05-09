import dbc from '../../aws/dbcontroller';
import rek from '../../aws/rekcontroller';
import s3 from '../../aws/s3controller';

const Bucket = 'testing-uswest2';
const MinConfidence = 75;
const region = 'us-west-2';
const TableName = 'Images';

const labelFile = (Bytes) => {
  const params = {
    Image: {
      Bytes,
    },
    MinConfidence,
  };

  return new Promise((fulfill, reject) => {
    rek.detectLabels(params, (err, data) => {
      if (err) reject(err);
      fulfill(data);
    });
  });
};

const labelS3 = (Name) => {
  const params = {
    Image: {
      S3Object: {
        Bucket,
        Name,
      },
    },
    MinConfidence,
  };

  return new Promise((fulfill, reject) => {
    rek.detectLabels(params, (err, data) => {
      if (err) reject(err);
      fulfill(data);
    });
  });
};

function store(Key, Labels, width, height) {
  const params = {
    TableName,
    Item: {
      Bucket,
      Key,
      Labels,
      width,
      height,
    },
  };

  return new Promise((fulfill, reject) => {
    dbc.putImage(params, (err, data) => {
      if (err) reject(err);
      fulfill(data);
    });
  });
}

function upload(file, ACL = 'public-read') {
  const params = {
    Bucket,
    ACL,
    Key: file.name,
    Body: file,
  };

  return new Promise((fulfill, reject) => {
    s3.upload(params, (err, data) => {
      if (err) reject(err);
      fulfill(data);
    });
  });
}

function submit(file, labels, width, height, callback) {
  const Key = file.name;

  const imgPrefix = `https://s3-${region}.amazonaws.com/${Bucket}/`;

  upload(file)
    // .then(() => label(Key))
    .then(() => store(Key, labels, width, height))
    .then(() => callback({ src: `${imgPrefix}${Key}`, width, height, labels }))
    .catch(err => console.error(err));
}

export { labelFile, labelS3, store, submit, upload };
