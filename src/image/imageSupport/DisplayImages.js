import React, { Component } from 'react';
import Gallery from 'react-photo-gallery';

class Images extends Component {

  render() {
      return(<Gallery photos={this.props.imageItems} />);
  }
}

export default Images;
