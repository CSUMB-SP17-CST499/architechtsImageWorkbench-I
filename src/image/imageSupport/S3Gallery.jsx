import AWS from 'aws-sdk';
import React, { Component } from 'react';
import Gallery from 'react-photo-gallery';

import { s3Config } from '../../aws/aws-config';

import '../ImageUpload.css';

const imgPrefix = 'https://s3-us-west-2.amazonaws.com/testing-uswest2/';

function shuffle(a) {
  const b = a;
  for (let i = a.length; i; i -= 1) {
    const j = Math.floor(Math.random() * i);
    [b[i - 1], b[j]] = [b[j], b[i - 1]];
  }
  return b;
}

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

    AWS.config = s3Config;
    this.s3 = new AWS.S3();

    this.state = {
      images: [],
    };

    this.displayImages();
  }

  displayImages() {
    // array of images to display

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
