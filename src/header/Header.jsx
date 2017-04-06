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
  logo: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
};

export default Header;
