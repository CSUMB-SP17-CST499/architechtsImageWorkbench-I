import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { upload } from '../image/support/core';

import './UploadButton.css';

const UploadButton = ({ addImage, canUpload, image }) => {
  const button = canUpload ?
    (
      <FlatButton
        style={{ backgroundColor: '#4d4d4d', color: 'white' }}
        onTouchTap={() => {
          const { file, name, width, height } = image;
          upload(file);
          const src = `https://s3-us-west-2.amazonaws.com/testing-uswest2/${name}`;
          addImage({
            src,
            width,
            height,
            thumbnail: src,
            thumbnailWidth: width,
            thumbnailHeight: height,
          });
          // .then(() => (previewLabels.filter(Label => (!Label.delete)));
          // .then(previewLabels => console.log(previewLabels));
          // .then((previewLabels) => store(image.name, previewLabels, image.width, image.height));
        }}
      >
        UPLOAD
      </FlatButton>
    ) :
    '';

  return <div className="button-div">{button}</div>;
};

UploadButton.propTypes = {
  addImage: PropTypes.func.isRequired,
  canUpload: PropTypes.bool.isRequired,
  image: PropTypes.objectOf(PropTypes.object).isRequired,
};

const UploadButtonRedux = connect(
  state => ({
    canUpload: state.canUpload,
    imageFile: state.imageFile,
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
