import AWS from 'aws-sdk';
import React, {Component} from 'react'
import Gallery from 'react-photo-gallery';

import '../imageUpload.css';

class S3Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: this.displayImages(),
    };
  }

  displayImages() {
    //array of images to display
    const access = process.env.AWS_ACCESS_KEY_ID;
    const secret = process.env.AWS_SECRET_ACCESS_KEY;
    AWS.config.update({
      credentials: new AWS.Credentials(access, secret),
      region: 'us-west-1'
    });

    const s3 = new AWS.S3();

    const params = {
      Bucket: 'storeimage.ag',
      Delimiter: '/',
    };

    const s3Images = [];
    s3.listObjects(params, function (err, data) {
      if(err)throw err;
      const contents = data.Contents;

      contents.forEach(content => s3Images.push(content.Key));
    });

    console.log(s3Images); //debugging purposes

    const imgNames = [
      "Cl7ua4oUgAEq59R.jpg",
      "IMG_2447.JPG",
      "fDwJgdR.jpg",
      "rMk4w6S.jpg",
    ];

    console.log(imgNames); // testing

    const imgPrefix = 'https://s3-us-west-1.amazonaws.com/storeimage.ag/';
    const images = [];
    imgNames.forEach((name) => {
      images.push(this.showImage(`${imgPrefix}${name}`));
    });

    return images;
  }

  showImages(src, width=600, height=600, aspectRatio=1.1) {
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
    return <Gallery photos={this.state.images} />;
  }
}

export default s3Gallery;
