import React, { Component } from 'react';
import Gallery from 'react-photo-gallery';

class Images extends Component {

  render() {
      console.log(this.props);
      return(<Gallery photos={this.props.imageItems} />);
  }
}

export default Images;
