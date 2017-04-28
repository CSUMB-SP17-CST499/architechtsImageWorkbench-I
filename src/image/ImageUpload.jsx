/* eslint-env browser, global FileReader */
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Chip from 'material-ui/Chip';
import { getImages } from './support/retriever';
import { submit } from './support/core';
import DisplayImages from './DisplayImages';
import rek from '../aws/rekcontroller';
import './ImageUpload.css';

injectTapEventPlugin();

const rekReader = new FileReader();
const urlReader = new FileReader();

let load1 = false;
let load2 = false;

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: '',
      images: [],
      tags: [],
    };
    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
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

  handleSubmit(e) {
    e.preventDefault();
     // Image Engine full process
     // commented out location.reload() for purpose of dislaying tags
    if (load1 && load2) {
      submit(this.state.file, this.imgWidth, this.imgHeight, () => {
        // location.reload();
        load1 = false;
        load2 = false;
      });
    }
  }

  handleImageChange(e) {
    e.preventDefault();
    const file = e.target.files[0];

    rekReader.onloadend = () => {
      const params = {
        Image: {
          Bytes: file,
        },
      };

      rek.detectLabels(params, (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        const tagsImg = [];
        for (let i = 0; i < data.Labels.length; i += 1) {
          const labelName = data.Labels[i].Name;
          tagsImg.push({ key: i, label: labelName });
        }
        console.log(tagsImg);
        this.sendTags(tagsImg);
      });

      load1 = true;
    };

    urlReader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: urlReader.result,
      }, () => {
        const img = document.getElementById('prev');
        img.onload = () => {
          this.imgWidth = img.width;
          this.imgHeight = img.height;
        };
      });

      load2 = true;
    };

    rekReader.readAsArrayBuffer(file);
    urlReader.readAsDataURL(file);
  }

  sendTags(tagsImg) {
    this.setState({ tags: tagsImg });
  }
  saveImages(images) {
    this.setState({ images });
  }
  handleRequestDelete(key) {
    console.log(key);
    this.tags = this.state.tags;
    const chipToDelete = this.tags.map(chip => chip.key).indexOf(key);
    this.tags.splice(chipToDelete, 1);
    this.setState({ tags: this.tags });
    // update file tags
    submit(this.state.file, this.imgWidth, this.imgHeight, () => {
    });
  }

  renderChip(data) {
    console.log(data.key);
    console.log(data.label);
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.handleRequestDelete(data.key)}
        style={this.styles.chip}
      >
        {data.label}
      </Chip>
    );
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

        <div className="tagPreview" style={this.styles.wrapper}>
          {this.state.tags.map(this.renderChip, this)}
        </div>
        <div className="imgPreview">
          {$imagePreview}
        </div>
        <DisplayImages imageItems={this.state.images} />
      </div>
    );
  }
}


export default ImageUpload;
