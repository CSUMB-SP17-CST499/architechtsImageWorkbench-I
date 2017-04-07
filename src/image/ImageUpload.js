import React, { Component } from 'react';

import S3Gallery from './imageSupport/S3Gallery';
import ImageUploadService from './imageSupport/ImageUploadService';
import DisplayImages from './imageSupport/DisplayImages';

import './imageUpload.css';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
        imagePreviewUrl: '',
        images: []
    };

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
    var fileBody = this.state.file;
    ImageUploadService.upload(fileBody); //send to s3 bucket
  }

  saveImages(images) {
      this.setState({images: images})
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
        <S3Gallery addImages={this.saveImages.bind(this)}/>
        <DisplayImages imageItems={this.state.images}/>
      </div>
    );
  }
}


export default ImageUpload;
