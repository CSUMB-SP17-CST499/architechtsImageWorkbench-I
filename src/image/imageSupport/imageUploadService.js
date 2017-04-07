import AWS from 'aws-sdk';

import { s3Config } from '../../aws/aws-config';
import tagImage from './tagImage';

function upload(file) {
    AWS.config = s3Config;
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
      if(err){
        console.log(err, data);
      }
      else{
        tagImage.tagImage(file); //send to rekognition to tag image
      }
    });
}

const ImageUploadService = {upload}
export default ImageUploadService;
