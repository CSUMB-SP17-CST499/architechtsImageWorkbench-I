import { combineReducers } from 'redux';

const images = (state = [], action) => {
  switch (action.type) {
    case 'SET_IMAGES':
      return action.images;

    default:
      return state;
  }
};

const previewImageUrl = (state = '', action) => {
  switch (action.type) {
    case 'SET_PREVIEW_IMAGE_URL':
      return action.url;

    default:
      return state;
  }
};

const previewLabels = (state = [], action) => {
  switch (action.type) {
    case 'SET_PREVIEW_LABELS':
      return action.labels;

    default:
      return state;
  }
};

const canUpload = (state = false, action) => {
  switch (action.type) {
    case 'SET_UPLOAD':
      return action.upload;

    default:
      return state;
  }
};

export default combineReducers({
  canUpload,
  images,
  previewImageUrl,
  previewLabels,
});
