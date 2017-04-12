/* eslint-env browser, global FileReader */
import React from 'react';

import { getImages } from './imageSupport/s3controller';
import upload from './imageSupport/imageUploadService';
import DisplayImages from './imageSupport/DisplayImages';

import './ImageUpload.css';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: '',
      images: [],
    };

    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    getImages((images) => {
      this.setState({
        images,
      });
    }, true);
  }

  handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      }, () => {
        const img = document.getElementById('prev');
        img.onload = () => {
          console.log(img.height);
          console.log(img.width);
        };
      });
    };

    reader.readAsDataURL(file);
  }

  handleSubmit(e) {
    e.preventDefault();
    upload(this.state.file); // send to s3 bucket
  }

  saveImages(images) {
    this.setState({ images });
  }

  render() {
    const { imagePreviewUrl } = this.state;
    const $imagePreview = imagePreviewUrl ?
      (<img className="imgUrl" id="prev" alt="imgUrl" src={imagePreviewUrl} />) :
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
        <DisplayImages imageItems={this.state.images} />
      </div>
    );
  }
}


export default ImageUpload;
