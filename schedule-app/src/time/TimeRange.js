import React from 'react';
import {FormGroup} from 'react-bootstrap';

import {VariablePath} from '../variable/VariablePropTypes';
import TimePicker from './TimePicker';
import './TimeRange.css';

export default TimeRange;


TimeRange.propTypes = {
  variablePath: VariablePath.isRequired,
  min: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired
}

export function TimeRange({ min, max, variablePath }) {
  return (
    <FormGroup className="TimeRange">
      <TimePicker timeUnits={min} variablePath={variablePath.concat(['min'])} />
      to
      <TimePicker timeUnits={max} variablePath={variablePath.concat(['max'])} />
    </FormGroup>
  );
}
