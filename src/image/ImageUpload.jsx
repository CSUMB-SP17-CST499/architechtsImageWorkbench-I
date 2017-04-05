<<<<<<< HEAD:src/image/ImageUpload.js
=======
/* global FileReader */
import AWS from 'aws-sdk';
>>>>>>> pushing config changes and changed code due to style guide. Nodemon is WIP:src/image/ImageUpload.jsx
import React, { Component } from 'react';

import S3Gallery from './imageSupport/S3Gallery';
import ImageUploadService from './imageSupport/ImageUploadService';


import './ImageUpload.css';

const localCredentials = require('../../json/credentials.json');

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = { imagePreviewUrl: '' };

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
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  handleSubmit(e) {
    e.preventDefault();
<<<<<<< HEAD:src/image/ImageUpload.js
    var fileBody = this.state.file;
    ImageUploadService.upload(fileBody); //send to s3 bucket

=======
    let access = process.env.AWS_ACCESS_KEY_ID;
    let secret = process.env.AWS_SECRET_ACCESS_KEY;
    let region = 'us-west-2';

    if (access == null || secret == null) {
      access = localCredentials.accessKeyId;
      secret = localCredentials.secretAccessKey;
      region = localCredentials.region;
    }

    const credentials = new AWS.Credentials(access, secret);

    AWS.config.update({
      credentials,
      region,
    });

    const s3image = new AWS.S3();

    const params = {
      Key: this.state.file.name,
      Body: this.state.file,
      Bucket: 'testing-uswest2',
      ACL: 'public-read',
    };

    const options = {
      partSize: 10 * 1024 * 1024,
      queueSize: 1,
    };

    s3image.upload(params, options, (err, data) => {
      console.log(err, data);
    });
>>>>>>> pushing config changes and changed code due to style guide. Nodemon is WIP:src/image/ImageUpload.jsx
  }

  render() {
    const { imagePreviewUrl } = this.state;
    const $imagePreview = imagePreviewUrl ?
      (<img className="imgU rl" alt="imgUrl" src={imagePreviewUrl} />) :
        'Please select an image for preview';


    return (
      <div className="previewComponent">
        <form onSubmit={this.handleSubmit}>
          <input className="fileInput" type="file" onChange={this.handleImageChange} />
          <button
            className="submitButton"
            type="submit"
            onClick={this.handleSubmit}
          >
            Upload Image
          </button>
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
        <S3Gallery />
      </div>
    );
  }
}


export default ImageUpload;
