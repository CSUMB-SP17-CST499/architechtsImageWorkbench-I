import React, { Component } from 'react';

import './Header.css';

class Header extends Component {

  render() {
    return(
      <div className="header">
        <img src={this.props.logo} className="logo" alt="logo" />
        <h2>{this.props.text}</h2>
      </div>
    );
  }
}

export default Header;
