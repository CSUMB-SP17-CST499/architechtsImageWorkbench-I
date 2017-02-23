import React from 'react';
import ReactDOM from 'react-dom';

import App from './js/App';
import ImageUpload from './js/ImageUpload';

import './css/index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

ReactDOM.render(
  <ImageUpload />,
  document.getElementById('image')
);
