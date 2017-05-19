/* eslint react/forbid-prop-types: "warn" */
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { store, upload } from '../image/support/core';

import './UploadButton.css';

const UploadButton = ({ addImage, canUpload, image, file, previewLabels }) => (
  <FlatButton
    style={{ display: canUpload ? 'inline' : 'none',
      backgroundColor: '#4d4d4d',
      color: 'white',
    }}
    onTouchTap={() => {
      const { name, width, height } = image;
      upload(file)
      .then(() => (previewLabels.filter(Label => !Label.delete)))
      .then((chosenLabels) => {
        store(name, chosenLabels, width, height)
        .catch(err => console.error(err));
      });
      const src = `https://s3-us-west-2.amazonaws.com/testing-uswest2/${name}`;
      addImage({
        src,
        width,
        height,
        thumbnail: src,
        thumbnailWidth: width,
        thumbnailHeight: height,
      });
    }}
  >
    UPLOAD
  </FlatButton>
);

UploadButton.propTypes = {
  addImage: PropTypes.func.isRequired,
  canUpload: PropTypes.bool.isRequired,
  image: PropTypes.object.isRequired,
  file: PropTypes.instanceOf('File').isRequired,
  previewLabels: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const UploadButtonRedux = connect(
  state => ({
    canUpload: state.canUpload,
    image: state.image,
    previewLabels: state.previewLabels,
  }),
  dispatch => ({
    addImage: (image) => {
      dispatch({
        image,
        type: 'ADD_IMAGE',
      });
    },
  }),
)(UploadButton);

export default UploadButtonRedux;
