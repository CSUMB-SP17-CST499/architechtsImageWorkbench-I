import Chip from 'material-ui/Chip';
import PropTypes from 'prop-types';
import React from 'react';

const styles = {
  display: 'inline-block',
};

class TagDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.makeChips = this.makeChips.bind(this);
  }

  makeChips() {
    const { labels } = this.props;
    let i = -1;
    const chips = labels.map((label) => {
      const tag = label.Name;
      i += 1;
      return (
        <Chip
          key={i}
          onRequestDelete={() => this.props.deleteChip(tag)}
          style={styles}
        >
          {tag}
        </Chip>
      );
    });
    return chips;
  }

  render() {
    const chips = this.makeChips();
    return <div className="tagPreview">{chips}</div>;
  }
}

TagDisplay.propTypes = {
  deleteChip: PropTypes.func.isRequired,
  labels: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TagDisplay;
