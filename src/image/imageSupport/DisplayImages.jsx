import React from 'react';
import Gallery from 'react-photo-gallery';

function DisplayImages(props) {
  return <Gallery photos={props.imageItems} />;
}

DisplayImages.propTypes = {
  imageItems: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default DisplayImages;
