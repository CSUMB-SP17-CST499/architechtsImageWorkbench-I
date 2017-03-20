import React, { Component } from 'react';

import Header from '../header/Header';
import ImageUpload from '../image/ImageUpload';
import logo from '../../img/pan-logo.png';

import './main.css';

class Main extends Component {
  render() {
    return (
      <div className="main">
        <Header logo={logo} text="Designers' Image Engine"/>
        <ImageUpload imagePreviewUrl='' />
      </div>
    );
  }
}

export default Main;
