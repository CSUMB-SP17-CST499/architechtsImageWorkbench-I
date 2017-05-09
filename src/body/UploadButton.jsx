import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import './UploadButton.css';

const UploadButton = ({ canUpload }) => {
  const button = canUpload ?
    <button>upload</button> :
    '';

  return <div className="button-div">{button}</div>;
};

UploadButton.propTypes = {
  canUpload: PropTypes.bool.isRequired,
};

const UploadButtonRedux = connect(
  state => ({ canUpload: state.canUpload }),
)(UploadButton);

export default UploadButtonRedux;
