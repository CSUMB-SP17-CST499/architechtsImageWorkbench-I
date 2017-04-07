/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main/Main';
import './index.css';

window.onload = () => {
  ReactDOM.render(<Main />, document.getElementById('root'));
};
