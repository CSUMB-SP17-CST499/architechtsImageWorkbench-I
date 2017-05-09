import Chip from 'material-ui/Chip';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import './ChipDisplay.css';

injectTapEventPlugin();

const styles = {
  chip: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 'auto',
  },
};

const ChipDisplay = ({ previewLabels }) => {
  const chips = previewLabels.map(label => (
    <Chip className="chip" key={label} style={styles.chip}>{label}</Chip>
  ));

  return (
    <div className="chip-display">
      {chips}
    </div>
  );
};

ChipDisplay.propTypes = {
  previewLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const ChipDisplayRedux = connect(
  state => ({ previewLabels: state.previewLabels }),
  dispatch => ({
    deleteLabel: (label) => {
      dispatch({
        label,
        type: 'DELETE_LABEL',
      });
    },
  }),
)(ChipDisplay);

export default ChipDisplayRedux;
