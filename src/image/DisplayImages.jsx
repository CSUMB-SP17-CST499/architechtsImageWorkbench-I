import PropTypes from 'prop-types';
import React from 'react';
import Gallery from 'react-photo-gallery';

function DisplayImages(props) {
  return <Gallery photos={props.imageItems} />;
}

DisplayImages.propTypes = {
  imageItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DisplayImages;
