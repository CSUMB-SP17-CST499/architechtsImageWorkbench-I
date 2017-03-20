import React, { Component } from 'react'

import './imageUpload.css';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {imagePreviewUrl: ''}

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
    console.log('handle uploading-', this.state.file);
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
