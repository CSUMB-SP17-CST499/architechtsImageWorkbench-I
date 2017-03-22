import React, { Component } from 'react'

import './Imageupload.css';

var AWS = require('aws-sdk');

var config = require('../aws/aws-config');

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {imagePreviewUrl: ''}

    AWS.config = config.config;
    this.s3image = new AWS.S3();

    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file);
  }

  handleSubmit(e) {
    e.preventDefault();

    var params = {
        Key: this.state.file.name,
        Body: this.state.file,
        Bucket: "storeimage.ag",
        ACL: 'public-read'
    };

    var options = {
        partSize: 10 * 1024 * 1024,
        queueSize: 1
    };

    this.s3image.upload(params, options, function(err, data) {
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
      </div>
    )
  }
}

export default ImageUpload;
