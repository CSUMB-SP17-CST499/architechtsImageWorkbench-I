import AWS from 'aws-sdk';
import React, { Component } from 'react';

import S3Gallery from './imageSupport/S3Gallery';

import './imageUpload.css';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {imagePreviewUrl: ''};

    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  handleSubmit(e) {
    e.preventDefault();
    let access = process.env.AWS_ACCESS_KEY_ID;
    let secret = process.env.AWS_SECRET_ACCESS_KEY;
    let region = 'us-west-2';

    if (access == null || secret == null) {
      const localCredentials = require('../../json/credentials.json');
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
        Key: this.state.file.name,
        Body: this.state.file,
        Bucket: "storeimage.ag",
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

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = imagePreviewUrl ?
      (<img className="imgUrl" alt="imgUrl" src={imagePreviewUrl} />) :
        'Please select an image for preview';


    return (
      <div className='previewComponent'>
        <form onSubmit={this.handleSubmit}>
          <input className='fileInput' type='file' onChange={this.handleImageChange} />
          <button className='submitButton' type='submit' onClick={this.handleSubmit}>Upload Image</button>
        </form>
        <div className='imgPreview'>
          {$imagePreview}
        </div>
        <S3Gallery />
      </div>
    );
  }
}


export default ImageUpload;
