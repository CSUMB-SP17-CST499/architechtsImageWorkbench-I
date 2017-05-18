import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ContentClear from 'material-ui/svg-icons/content/clear';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { labelFile } from '../image/support/core';
import ChipDisplay from './ChipDisplay';
import UploadButton from './UploadButton';

import './UpperBody.css';

const byteReader = new FileReader();
const urlReader = new FileReader();

const UpperBody = ({
  clearSearch,
  previewImageUrl,
  searchOpen,
  searchQuery,
  setPreviewImageUrl,
  setPreviewLabels,
  setQuery,
  setSearchOpen,
  setUpload,
}) => {
  const clearButton = searchQuery ?
    (
      <IconButton
        style={{
          display: 'inline-block',
          padding: '0px',
          width: '24px',
        }}
        onClick={clearSearch}
      >
        <ContentClear />
      </IconButton>
    ) : '';

  const imagePreview = previewImageUrl ?
    <img src={previewImageUrl} alt="preview" id="preview-img" /> :
    'Please select an image to preview';

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

  const onSearchClick = () => {
    if (searchOpen) {
      if (!searchQuery) {
        setSearchOpen(false);
      } else {
        console.log(searchQuery);
      }
    } else {
      setSearchOpen(true);
    }
  };

  const searchStyle = {
    display: searchOpen ? 'inline-block' : 'none',
    marginLeft: '4px',
    marginRight: 'e4px',
    verticalAlign: 'top',
  };

  console.log(searchQuery);

  return (
    <div className="body-upper">
      <div className="body-upper-spacer" />
      <div className="body-upper-left">
        <label htmlFor="preview-upload" id="upload-label">
          <input
            type="file"
            name="photo"
            id="preview-upload"
            onChange={onImageChange}
          />
          {imagePreview}
        </label>
      </div>
      <div className="body-upper-right">
        <div className="search">
          <TextField
            style={searchStyle}
            onChange={e => setQuery(e.target.value)}
            value={searchQuery}
          />
          <IconButton
            style={{ display: 'inline-block' }}
            onClick={onSearchClick}
          >
            <ActionSearch style={{ display: 'inline-block' }} />
          </IconButton>
        </div>
        <div className="chip-div">
          <ChipDisplay />
          <UploadButton />
        </div>
      </div>
      <div className="body-upper-spacer">
        {clearButton}
      </div>
    </div>
  );
};

UpperBody.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  previewImageUrl: PropTypes.string.isRequired,
  searchOpen: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setPreviewImageUrl: PropTypes.func.isRequired,
  setPreviewLabels: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  setSearchOpen: PropTypes.func.isRequired,
  setUpload: PropTypes.func.isRequired,
};

const UpperBodyRedux = connect(
  state => ({
    previewImageUrl: state.previewImageUrl,
    searchOpen: state.searchOpen,
    searchQuery: state.searchQuery,
  }),
  dispatch => ({
    clearSearch: () => {
      dispatch({
        type: 'CLEAR_SEARCH_QUERY',
      });
    },

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

    setQuery: (query) => {
      dispatch({
        query,
        type: 'SET_SEARCH_QUERY',
      });
    },

    setSearchOpen: (open) => {
      dispatch({
        open,
        type: 'SET_SEARCH_OPEN',
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
