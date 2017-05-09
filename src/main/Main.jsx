import React from 'react';
import { Provider } from 'react-redux';

import Body from '../body/Body';
import configureStore from '../data/configureStore';
import Header from '../header/Header';
// import ImageUpload from '../image/ImageUpload';
import logo from '../../public/panafold.jpg';

import './Main.css';

const Main = () => (
  <Provider store={configureStore()}>
    <div className="main">
      <Header logo={logo} text="Designers' Image Engine" />
      <Body />
    </div>
  </Provider>
);

export default Main;
