import React, {Component} from 'react'
import Gallery from 'react-photo-gallery';
import '../imageUpload.css';
var AWS = require('aws-sdk');

class s3Gallery extends Component {

    displayImages() {
      //array of images to display
      var s3Images = [];
      var access = process.env.AWS_ACCESS_KEY_ID;
      var secret = process.env.AWS_SECRET_ACCESS_KEY;
      AWS.config.update({
        credentials: new AWS.Credentials(access, secret),
        region: 'us-west-1'
      });

      var s3 = new AWS.S3();

      var params = {
        Bucket: 'storeimage.ag',
        Delimiter: '/'

      }

      s3.listObjects(params, function (err, data) {
        if(err)throw err;
        var contents = data.Contents;

           contents.forEach(function (content) {
              s3Images.push(content.Key);
             });
      });
        console.log(s3Images); //debugging purposes

        var imgNames = [
          "https://s3-us-west-1.amazonaws.com/storeimage.ag/Cl7ua4oUgAEq59R.jpg",
          "https://s3-us-west-1.amazonaws.com/storeimage.ag/IMG_2447.JPG",
          "https://s3-us-west-1.amazonaws.com/storeimage.ag/fDwJgdR.jpg",
          "https://s3-us-west-1.amazonaws.com/storeimage.ag/rMk4w6S.jpg"
        ];

        console.log(imgNames);//testing
        const IMAGES = [];

        for (var i = 0; i < imgNames.length; i++) {
          IMAGES.push(this.showImage(imgNames[i], 600, 600, 1.1));
        }
        return IMAGES;
    }

    showImage(url, img_width, img_height, ratio) {
      //ratio of images
        var IMAGES =
            {  src: url,
                width: img_width,
                height: img_height,
                aspectRatio: ratio,
                lightboxImage: {
                    src: url,  }
            }
        return IMAGES;
    }
    render() {
        return (
          <div><Gallery photos={this.displayImages()} /></div>
        )
    }

}

export default s3Gallery;
