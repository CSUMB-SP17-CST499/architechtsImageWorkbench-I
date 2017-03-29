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
    const access = process.env.AWS_ACCESS_KEY_ID;
    const secret = process.env.AWS_SECRET_ACCESS_KEY;

    if (access == null || secret == null) {
      AWS.config.loadFromPath('../../json/credentials.json');
    } else{
      AWS.config.update({
        accessKeyId: access,
        secretAccessKey: secret,
        "region": "us-west-1"
      });
    }

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
