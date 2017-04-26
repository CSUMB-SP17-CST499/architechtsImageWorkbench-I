import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';

import { s3Config } from './aws-config';
import s3 from './s3controller';

/*
    Tests the s3controller module. "pdie-unit-test" bucket is cleared before
    each test run
*/

AWS.config = s3Config;
const s3ForTest = new AWS.S3();

describe('s3controller test suite', () => {

  const Bucket = 'pdie-unit-test';

  let params;

  beforeAll(() => {
    const params = {
      Bucket,
      Key: '8a9.png',
    }

    return new Promise((fulfill, reject) => {
      s3ForTest.deleteObject(params, (err, data) => {
        if (err) reject();
        fulfill();
      });
    });
  });

  test('s3controller uploads an image to the "pdie-unit-test" bucket', done => {
    const ACL = 'public-read';
    const haroldPath = path.join(__dirname, '../../img/test/8a9.png');
    const Key = '8a9.png';

    let params = {
      Bucket,
      Key,
    };
    s3ForTest.getObject(params, (err, data) => expect(data).toBeNull());

    fs.readFile(haroldPath, (err, data) => {
      params = {
        Bucket,
        Key,
        ACL,
        Body: data,
      };
      s3ForTest.getObject(params, (err, data) => {
        expect(data).toBeNull();

        s3.upload(params, (err, data) => {
          expect(err).toBeNull();
          params = {
            Bucket,
            Key,
          };

          s3ForTest.getObject(params, (err, data) => {
            expect(err).toBeNull();
            done();
          });
        });
      });
    });
  });
});
