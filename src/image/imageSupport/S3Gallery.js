import AWS from 'aws-sdk';
import React, {Component} from 'react'

import '../imageUpload.css';

class S3Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: this.displayImages,
    };
    this.displayImages();
  }

  displayImages() {
    //array of images to display
    const access = "AKIAIO3XMHQ4DRH3WS7Q";
    const secret = "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";
    AWS.config.update({
      credentials: new AWS.Credentials(access, secret),
      region: 'us-west-2',
    });

    const s3 = new AWS.S3();

    const params = {
      Bucket: 'testing-uswest2',
      Delimiter: '/',
    };

    const s3Images = [];
    const actualImages = [];
    s3.listObjects(params, (err, data)  => {
      if(err)throw err;
      else {
          for(var i in data.Contents) {
            s3Images.push(data.Contents[i].Key);
          }
          const imgPrefix = 'https://s3-us-west-2.amazonaws.com/testing-uswest2/';
          s3Images.forEach((name) => {
            actualImages.push(this.showImage(`${imgPrefix}${name}`));
          });

          console.log("teset");

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
    //   this.displayImages(this.state.images);
    //   console.log(this.state.images);
    return  <h3> Fallas </h3>
  }
}

export default S3Gallery;
