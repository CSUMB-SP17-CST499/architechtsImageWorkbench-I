import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import './UploadButton.css';

const UploadButton = ({ canUpload }) => {
  const button = canUpload ?
    <FlatButton style={{ backgroundColor: '#4d4d4d', color: 'white' }}>UPLOAD</FlatButton> :
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
