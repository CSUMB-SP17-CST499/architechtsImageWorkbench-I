import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import ImagePreview from './ImagePreview';
import { labelFile } from '../image/support/core';
import ChipDisplay from './ChipDisplay';
import UploadButton from './UploadButton';

import './UpperBody.css';

const byteReader = new FileReader();
const urlReader = new FileReader();

const UpperBody = ({ setPreviewImageUrl, setPreviewLabels, setUpload }) => {
  const onImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    byteReader.onloadend = () => {
      setUpload(false);
      labelFile(byteReader.result).then(({ Labels }) => {
        const labels = Labels.map(Label => (Label.Name));
        setPreviewLabels(labels);
        setUpload(true);
      });
    };

    urlReader.onloadend = () => {
      setPreviewImageUrl(urlReader.result);
    };

    byteReader.readAsArrayBuffer(file);
    urlReader.readAsDataURL(file);
  };

  return (
    <div className="body-upper">
      <ChipDisplay />
      <label id="upload-label" htmlFor="preview-upload">
        <ImagePreview />
      </label>
      <input
        type="file"
        name="photo"
        id="preview-upload"
        onChange={onImageChange}
      />
      <UploadButton />
    </div>
  );
};

UpperBody.propTypes = {
  setPreviewImageUrl: PropTypes.func.isRequired,
  setPreviewLabels: PropTypes.func.isRequired,
  setUpload: PropTypes.func.isRequired,
};

const UpperBodyRedux = connect(
  null,
  dispatch => ({
    setPreviewImageUrl: (url) => {
      dispatch({
        url,
        type: 'SET_PREVIEW_IMAGE_URL',
      });
    },

    setPreviewLabels: (labels) => {
      dispatch({
        labels,
        type: 'SET_PREVIEW_LABELS',
      });
    },

    setUpload: (upload) => {
      dispatch({
        upload,
        type: 'SET_UPLOAD',
      });
    },
  }),
)(UpperBody);

export default UpperBodyRedux;
