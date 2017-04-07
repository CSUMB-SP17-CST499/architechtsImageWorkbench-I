import AWS from 'aws-sdk';
import React, {Component} from 'react'

import '../ImageUpload.css';

class S3Gallery extends Component {
  constructor(props) {
    super(props);
    this.displayImages();
  }

  displayImages() {
    const localCredentials = require('../../../json/credentials.json');
    let access = localCredentials.accessKeyId;
    let secret = localCredentials.secretAccessKey;
    let region = localCredentials.region;

    const credentials = new AWS.Credentials(access, secret);
    AWS.config.update({
      credentials,
      region
    });

    const s3 = new AWS.S3();
    const params = {
      Bucket: 'testing-uswest2',
      Delimiter: '/',
    };
    const imgPrefix = 'https://s3-us-west-2.amazonaws.com/testing-uswest2/';
    const s3Images = [];
    const actualImages = [];
    s3.listObjects(params, (err, data)  => {
      if (err) { console.log(err, err.stack); }
      else {
        for(var i in data.Contents) {
          s3Images.push(data.Contents[i].Key);
        }

        s3Images.forEach((name) => {
          actualImages.push(this.showImage(`${imgPrefix}${name}`));
        });

        this.props.addImages(actualImages);
      }
    });
  }

  showImage(src, width=600, height=600, aspectRatio=1.1) {
    //ratio of images
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

  render() {
    return (<div> </div>);
  }
}

export default S3Gallery;
