import AWS from 'aws-sdk';
import React, { Component } from 'react';
import Gallery from 'react-photo-gallery';

<<<<<<< HEAD
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
=======
import '../ImageUpload.css';

>>>>>>> pushing config changes and changed code due to style guide. Nodemon is WIP
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
<<<<<<< HEAD
    AWS.config = s3Config;
    this.s3 = new AWS.S3();

=======
    AWS.config = s3config;
    this.s3 = new AWS.S3();

    this.displayImages();

>>>>>>> created single module for database and s3 config. Added update dbcontroller tests. Updated files that use AWS so they have the right config. Split awsconfig into dbconfig and s3config. Capitalized names of files related to compnents. S3Gallery renders all images. Updated file so that it rerenders when they're done loading. App can now be served from express via server.js and uploaded to AWS. Added new commands in package.json for development.
=======
>>>>>>> pushing config changes and changed code due to style guide. Nodemon is WIP
    this.state = {
      images: this.displayImages(),
    };

    this.displayImages();
  }

  displayImages() {
    // array of images to display
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> created single module for database and s3 config. Added update dbcontroller tests. Updated files that use AWS so they have the right config. Split awsconfig into dbconfig and s3config. Capitalized names of files related to compnents. S3Gallery renders all images. Updated file so that it rerenders when they're done loading. App can now be served from express via server.js and uploaded to AWS. Added new commands in package.json for development.
=======
    const access = process.env.AWS_ACCESS_KEY_ID;
    const secret = process.env.AWS_SECRET_ACCESS_KEY;
    AWS.config.update({
      credentials: new AWS.Credentials(access, secret),
      region: 'us-west-2',
    });

    const s3 = new AWS.S3();

>>>>>>> pushing config changes and changed code due to style guide. Nodemon is WIP
    const params = {
      Bucket: 'testing-uswest2',
      Delimiter: '/',
    };

    const s3Images = [];
    s3.listObjects(params, (err, data) => {
      if (err) throw err;
      const contents = data.Contents;

      contents.forEach(content => s3Images.push(content.Key));
    });
    console.log(s3Images); // debugging purposes

    const imgNames = [
      'IwERLBl.jpg',
      'testImage2.jpg',
      'testImage5.jpg',
    ];

    console.log(imgNames); // testing

    const imgPrefix = 'https://s3-us-west-2.amazonaws.com/testing-uswest2/';
    const images = [];
    imgNames.forEach((name) => {
      images.push(this.showImage(`${imgPrefix}${name}`));
    });

    return images;
  }

  render() {
    return <Gallery photos={this.state.images} />;
  }
}

export default S3Gallery;
