/* eslint-env browser */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main/Main';
import './index.css';

function MainMui() {
  return (
    <MuiThemeProvider>
      <Main />
    </MuiThemeProvider>
  );
}

ReactDOM.render(
  <MainMui />,
  document.getElementById('root'),
);
