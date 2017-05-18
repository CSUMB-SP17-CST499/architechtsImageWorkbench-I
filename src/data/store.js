import { combineReducers } from 'redux';

const canUpload = (state = false, action) => {
  switch (action.type) {
    case 'SET_UPLOAD':
      return action.upload;

    default:
      return state;
  }
};

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

const previewLabel = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_DELETE':
      if (state.label !== action.label) {
        return state;
      }

      return {
        ...state,
        delete: !state.delete,
      };

    default:
      return state;
  }
};

const previewLabels = (state = [], action) => {
  switch (action.type) {
    case 'SET_PREVIEW_LABELS':
      return action.labels.map(label => ({
        label,
        delete: false,
      }));

    case 'TOGGLE_DELETE':
      return state.map(label => previewLabel(label, action));

    default:
      return state;
  }
};

const searchOpen = (state = false, action) => {
  switch (action.type) {
    case 'SET_SEARCH_OPEN':
      return action.open;

    default:
      return state;
  }
};

const searchQuery = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_SEARCH_QUERY':
      return '';

    case 'SET_SEARCH_QUERY':
      return action.query;

    default:
      return state;
  }
};

export default combineReducers({
  canUpload,
  images,
  previewImageUrl,
  previewLabels,
  searchOpen,
  searchQuery,
});
