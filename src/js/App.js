import React, { Component } from 'react';
import logo from '../../img/pan-logo.png';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App-header">
          <img src={logo}  className="App-logo" alt="logo" />
          <h2>Designers&apos; ImagEngine</h2>
        </div>

    );
  }
}

export default App;
