import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import './ImagePreview.css';

const ImagePreview = ({ previewImageUrl }) => (
  <div className="imagePreview">{
    previewImageUrl ?
      <img src={previewImageUrl} alt="preview" id="preview-img" /> :
      'Please select an image to preview'
  }</div>
);

ImagePreview.propTypes = {
  previewImageUrl: PropTypes.string.isRequired,
};

const ImagePreviewRedux = connect(
  state => ({ previewImageUrl: state.previewImageUrl }),
)(ImagePreview);

export default ImagePreviewRedux;
