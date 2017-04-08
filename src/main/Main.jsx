import React from 'react';

import Header from '../header/Header';
import ImageUpload from '../image/ImageUpload';
import logo from '../../img/pan-logo.png';

import './Main.css';

function Main() {
  return (
    <div className="main">
      <Header logo={logo} text="Designers' Image Engine" />
      <ImageUpload imagePreviewUrl="" />
    </div>
  );
}

export default Main;
