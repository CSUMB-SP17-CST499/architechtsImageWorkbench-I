/* global FileReader */
import React, { Component } from 'react';

import S3Gallery from './imageSupport/S3Gallery';
import upload from './imageSupport/ImageUploadService';


import './ImageUpload.css';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = { imagePreviewUrl: '' };

    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleImageChange(e) {
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
    upload(this.state.file); // send to s3 bucket
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
