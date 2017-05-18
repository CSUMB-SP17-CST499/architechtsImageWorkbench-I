import Chip from 'material-ui/Chip';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import './ChipDisplay.css';

injectTapEventPlugin();

const styles = {
  display: 'inline-block',
  flexWrap: 'wrap',
  margin: 'auto',
};

const stylesDelete = {
  ...styles,
  backgroundColor: '#ff6666',
};

const ChipDisplay = ({ deleteLabel, previewLabels }) => {
  const chips = previewLabels.map(label => (
    <Chip
      className="chip"
      key={label.label}
      onTouchTap={() => deleteLabel(label.label)}
      style={label.delete ? stylesDelete : styles}
    >
      {label.label}
    </Chip>
  ));

  return (
    <div className="chip-display">
      {chips}
    </div>
  );
};

ChipDisplay.propTypes = {
  deleteLabel: PropTypes.func.isRequired,
  previewLabels: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const ChipDisplayRedux = connect(
  state => ({ previewLabels: state.previewLabels }),
  dispatch => ({
    deleteLabel: (label) => {
      dispatch({
        label,
        type: 'TOGGLE_DELETE',
      });
    },
  }),
)(ChipDisplay);

export default ChipDisplayRedux;
