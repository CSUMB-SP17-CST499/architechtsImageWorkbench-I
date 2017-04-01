import AWS from 'aws-sdk';

function upload(file) {
    console.log(file);

    let access = process.env.AWS_ACCESS_KEY_ID;
    let secret = process.env.AWS_SECRET_ACCESS_KEY;
    let region = 'us-west-2';

  if (access == null || secret == null) {
    const localCredentials = require('../../../json/credentials.json');
    access = localCredentials.accessKeyId;
    secret = localCredentials.secretAccessKey;
    region = localCredentials.region;
  }

    const credentials = new AWS.Credentials(access, secret);

  AWS.config.update({
      credentials,
      region
  });

    const s3image = new AWS.S3();

    const params = {
        Key: file.name,
        Body: file,
        Bucket: "testing-uswest2",
        ACL: 'public-read',
      };

    const options = {
        partSize: 10 * 1024 * 1024,
        queueSize: 1,
      };

  s3image.upload(params, options, function(err, data) {
      console.log(err, data);
  });
}

const ImageUploadService = {upload}
export default ImageUploadService;
