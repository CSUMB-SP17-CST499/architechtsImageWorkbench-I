import dbc from '../../aws/dbcontroller';
import rek from '../../aws/rekcontroller';
import s3 from '../../aws/s3controller';

const Bucket = 'testing-uswest2';
const TableName = 'Images';

function label(Key) {
  const params = {
    Image: {
      S3Object: {
        Bucket,
        Name: Key,
      },
    },
    MinConfidence: 75,
  };

  return new Promise((fulfill, reject) => {
    rek.detectLabels(params, (err, data) => {
      if (err) reject(err);
      fulfill(data);
    });
  });
}

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

function upload(file, callback, ACL = 'public-read') {
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

function submit(file, width, height, callback) {
  const Key = file.name;

  upload(file)
    .then(() => label(Key))
    .then(data => store(Key, data.Labels, width, height))
    .then(() => callback())
    .catch(err => console.error(err));
}

export { label, store, submit, upload };
