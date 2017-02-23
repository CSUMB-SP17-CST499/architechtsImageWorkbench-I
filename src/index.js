import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import ImageUpload from './ImageUpload';

import '../css/index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

ReactDOM.render(
  <ImageUpload />,
  document.getElementById('image')
);
