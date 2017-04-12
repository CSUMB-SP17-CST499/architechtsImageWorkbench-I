import dbc from '../aws/dbcontroller';
import rek from '../aws/rekcontroller';
import s3 from '../aws/s3controller';

const Bucket = 'testing-uswest2';
const TableName = 'Images';

function label(Key, callback) {
  const params = {
    Image: {
      S3Object: {
        Bucket,
        Name: Key,
      },
    },
  };

  rek.detectLabels(params, callback);
}

function store(data, Key, width, height, callback) {
  const params = {
    TableName,
    Item: {
      Bucket,
      Key,
      Labels: data.Labels,
      width,
      height,
    },
  };

  dbc.putImage(params, callback);
}

function upload(file, ACL = 'public-read') {
  const params = {
    Bucket,
    ACL,
    Key: file.name,
    Body: file,
  };

  s3.upload(params);
}

function submit(file, width, height) {
  upload(file, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
  });
  const Key = file.name;
  label(Key, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
    store(data, Key, width, height, (err2, data2) => {
      if (err2) {
        console.error(err2);
      } else {
        console.log(data2);
      }
    });
  });
}

export { label, store, submit, upload };
