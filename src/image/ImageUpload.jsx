/* eslint-env browser, global FileReader */
import Chip from 'material-ui/Chip';
import PropTypes from 'prop-types';
import React from 'react';
import Gallery from 'react-grid-gallery';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { labelFile, submit } from './support/core';
import rek from '../aws/rekcontroller';
import './ImageUpload.css';
import TagDisplay from './TagDisplay';

injectTapEventPlugin();

const Bucket = 'testing-uswest2';

let load1 = false;
let load2 = true;

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: '',
      tags: [],
      labels: [],
    };
    this.styles = {
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };
    this.deleteChip = this.deleteChip.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getTags() {
    const params = {
      Image: {
        S3Object: {
          Bucket,
          Name: this.state.file.name,
        },
      },
      MinConfidence: 75,
    };
    const tagsImg = [];
    return new Promise((fulfill, reject) => {
      rek.detectLabels(params, (err, data) => {
        if (err) reject(err);
        fulfill(data);
        for (let i = 0; i < data.Labels.length; i += 1) {
          const labelName = data.Labels[i].Name;
          tagsImg.push({ key: i, label: labelName });
        }
        this.sendTags(tagsImg);
      });
    });
  }

  deleteChip(Name) {
    const labels = this.state.labels.filter(label => (label.Name !== Name));
    this.setState({
      labels,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
     // Image Engine full process
     // commented out location.reload() for purpose of dislaying tags
    if (load1 && load2) {
      submit(
        this.state.file,
        this.state.labels,
        this.imgWidth,
        this.imgHeight,
        (image) => {
          this.setState({
            images: [image, ...this.state.images],
          });
        },
      );
    }
  }

  handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const reader2 = new FileReader();

    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      }, () => {
        const img = document.getElementById('prev');
        img.onload = () => {
          this.imgWidth = img.width;
          this.imgHeight = img.height;
          load1 = true;
        };
      });
    };

    reader2.onloadend = () => {
      labelFile(reader2.result).then((data) => {
        this.setState({
          labels: data.Labels,
        });
        load2 = true;
      });
    };

    reader.readAsDataURL(file);
    reader2.readAsArrayBuffer(file);
  }

  sendTags(tagsImg) {
    this.setState({ tags: tagsImg });
  }

  saveImages(images) {
    this.setState({ images });
  }

  handleRequestDelete(key) {
    this.tags = this.state.tags;
    const chipToDelete = this.tags.map(chip => chip.key).indexOf(key);
    this.tags.splice(chipToDelete, 1);
    this.setState({ tags: this.tags });
    // update file tags
    submit(this.state.file, this.imgWidth, this.imgHeight, () => {
    });
  }

  renderChip(data) {
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
          <TagDisplay labels={this.state.labels} deleteChip={this.deleteChip} />
        </div>
        <div className="imgPreview">
          <img
            className="imgUrl"
            id="prev"
            alt="Please select an item for preview"
            src={this.state.imagePreviewUrl}
          />
        </div>
        <Gallery
          images={this.props.images}
          enableImageSelection={false}
          backdropClosesModal
          enableKeyboardInput
        />
      </div>
    );
  }
}

ImageUpload.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const ImageUploadRedux = connect(
  state => ({ images: state.images }),
)(ImageUpload);

export default ImageUploadRedux;
