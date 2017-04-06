import AWS from 'aws-sdk';
import React, { Component } from 'react';
import Gallery from 'react-photo-gallery';

<<<<<<< HEAD
import { s3Config } from '../../aws/aws-config';

import '../ImageUpload.css';

const imgPrefix = 'https://s3-us-west-2.amazonaws.com/testing-uswest2/';

=======
import { s3config } from '../../aws/aws-config';

import '../ImageUpload.css';

>>>>>>> created single module for database and s3 config. Added update dbcontroller tests. Updated files that use AWS so they have the right config. Split awsconfig into dbconfig and s3config. Capitalized names of files related to compnents. S3Gallery renders all images. Updated file so that it rerenders when they're done loading. App can now be served from express via server.js and uploaded to AWS. Added new commands in package.json for development.
function shuffle(a) {
  const b = a;
  for (let i = a.length; i; i -= 1) {
    const j = Math.floor(Math.random() * i);
    [b[i - 1], b[j]] = [b[j], b[i - 1]];
  }
  return b;
}

<<<<<<< HEAD
=======
const imgPrefix = 'https://s3-us-west-2.amazonaws.com/testing-uswest2/';

>>>>>>> created single module for database and s3 config. Added update dbcontroller tests. Updated files that use AWS so they have the right config. Split awsconfig into dbconfig and s3config. Capitalized names of files related to compnents. S3Gallery renders all images. Updated file so that it rerenders when they're done loading. App can now be served from express via server.js and uploaded to AWS. Added new commands in package.json for development.
class S3Gallery extends Component {
  static showImage(src, width = 600, height = 600, aspectRatio = 1.1) {
    // ratio of images
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

  constructor(props) {
    super(props);

<<<<<<< HEAD
    AWS.config = s3Config;
    this.s3 = new AWS.S3();

=======
    AWS.config = s3config;
    this.s3 = new AWS.S3();

    this.displayImages();

>>>>>>> created single module for database and s3 config. Added update dbcontroller tests. Updated files that use AWS so they have the right config. Split awsconfig into dbconfig and s3config. Capitalized names of files related to compnents. S3Gallery renders all images. Updated file so that it rerenders when they're done loading. App can now be served from express via server.js and uploaded to AWS. Added new commands in package.json for development.
    this.state = {
      images: [],
    };

    this.displayImages();
  }

  displayImages() {
    // array of images to display
<<<<<<< HEAD

=======
>>>>>>> created single module for database and s3 config. Added update dbcontroller tests. Updated files that use AWS so they have the right config. Split awsconfig into dbconfig and s3config. Capitalized names of files related to compnents. S3Gallery renders all images. Updated file so that it rerenders when they're done loading. App can now be served from express via server.js and uploaded to AWS. Added new commands in package.json for development.
    const params = {
      Bucket: 'testing-uswest2',
      Delimiter: '/',
    };

    const s3Images = [];
    this.s3.listObjects(params, (err, data) => {
      if (err) console.error(err);

      shuffle(data.Contents).forEach((s3Object) => {
        s3Images.push(S3Gallery.showImage(`${imgPrefix}${s3Object.Key}`));
      });

      this.setState({
        images: s3Images,
      });
    });
  }

  render() {
    return <Gallery photos={this.state.images} />;
  }
}

export default S3Gallery;
