/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main/Main';
import './index.css';

window.addEventListener('load', () => {
  ReactDOM.render(<Main />, document.getElementById('root'));
});
