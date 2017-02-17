import React, { Component } from 'react'
import './ImageUpload.css'

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {file: '', imagePreviewUrl: ''}
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
    e.preventDefault(e);
    console.log('handle uploading-', this.state.file);
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className='previewText'>Please select an image for preview</div>);
    }

    return (
      <div className='previewComponent'>
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <input className='fileInput' type='file' onChange={(e)=>this.handleImageChange(e)} />
          <button className='submitButton' type='submit' onClick={(e)=>this.handleSubmit(e)}>Upload Image</button>
        </form>
        <div className='imgPreview'>
          {$imagePreview}
        </div>
      </div>
    )
  }
}

export default ImageUpload;
