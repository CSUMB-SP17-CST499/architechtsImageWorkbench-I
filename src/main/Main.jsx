import React from 'react';

import Header from '../header/Header';
import ImageUpload from '../image/ImageUpload';

import './Main.css';

function Main() {
  return (
    <div className="main">
      <Header logo={'https://lh6.googleusercontent.com/-TCxIQg7pOzs/AAAAAAAAAAI/AAAAAAAAADM/gBZHOGjkz1o/photo.jpg'} text="Designers' Image Engine" />
      <ImageUpload imagePreviewUrl="" />
    </div>
  );
}

export default Main;
