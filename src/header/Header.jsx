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
<<<<<<< HEAD
  logo: React.PropTypes.string.isRequired,
=======
  logo: React.PropTypes.image.isRequired,
>>>>>>> pushing config changes and changed code due to style guide. Nodemon is WIP
  text: React.PropTypes.string.isRequired,
};

export default Header;
