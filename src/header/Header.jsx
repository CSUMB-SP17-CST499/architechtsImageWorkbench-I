import PropTypes from 'prop-types';
import React from 'react';

import './Header.css';

const Header = ({ logo, text }) => (
  <div className="header">
    <img src={logo} className="logo" alt="logo" />
    <h2>{text}</h2>
  </div>
);

Header.propTypes = {
  logo: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Header;
