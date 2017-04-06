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
