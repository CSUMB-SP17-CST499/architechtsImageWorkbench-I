import React, { Component, PropTypes } from 'react';
import Gallery from 'react-grid-gallery';

function createTag(value, title) {
  return ({
    value,
    title,
  });
}

class DisplayImages extends Component {

  constructor() {
    super();

    this.state = {
      photos: null,
      lightboxIsOpen: false,
      currentImage: 0,
      backdropClosesModal: true,
    };

    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.goToNext = this.goToNext.bind(this);
    this.goToPrevious = this.goToPrevious.bind(this);
  }

  openLightbox(index, event) {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }

  goToPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  goToNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  gotoImage(index) {
    this.setState({
      currentImage: index,
    });
  }

  addValues() {
    let i = 0;
    for (i; i < this.props.imageItems.length; i += 1) {
      const rowTags = [];
      rowTags.push(createTag(
        this.props.imageItems[i].labels.length,
        this.props.imageItems[i].labels.length));
      this.props.imageItems[i].tags = rowTags;
      this.props.imageItems[i].thumbnail = this.props.imageItems[i].src;
      this.props.imageItems[i].thumbnailWidth = this.props.imageItems[i].width;
      this.props.imageItems[i].thumbnailHeight = this.props.imageItems[i].height;
    }
  }

  render() {
    this.addValues();
    return (<Gallery images={this.props.imageItems} enableImageSelection={false} />);
  }
}

DisplayImages.propTypes = {
  imageItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DisplayImages;
