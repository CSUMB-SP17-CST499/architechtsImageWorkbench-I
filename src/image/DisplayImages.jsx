import React, { Component, PropTypes } from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';

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

  renderGallery() {
    return <Gallery photos={this.props.imageItems} onClickPhoto={this.openLightbox} />;
  }

  render() {
    return (
      <div className="DisplayImages">
        {this.renderGallery()}
        <Lightbox
          images={this.props.imageItems}
          backdropClosesModal={this.state.backdropClosesModal}
          onClose={this.closeLightbox}
          onClickPrev={this.goToPrevious}
          onClickNext={this.goToNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
          width={1600}
        />
      </div>
    );
  }
}

DisplayImages.propTypes = {
  imageItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DisplayImages;
