import { createStore } from 'redux';

import imageStore from './store';
import { getImages } from '../image/support/retriever';

const configureStore = () => {
  const store = createStore(imageStore);

  getImages((images) => {
    store.dispatch({
      images,
      type: 'SET_IMAGES',
    });
  });

  return store;
};

export default configureStore;
