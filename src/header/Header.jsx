import PropTypes from 'prop-types';
import React from 'react';

import './Header.css';

function Header(props) {
  return (
    <div className="header">
      <img src={props.logo} className="logo" alt="logo" />
      <h2>{props.text}</h2>
    </div>
  );
}

Header.propTypes = {
  logo: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Header;
