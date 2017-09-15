import React from 'react';
import {connect} from 'react-redux';
import {FormGroup} from 'react-bootstrap';

import {updateValue} from '../state/StateActionCreators';
import {extractMinutesPerUnit} from '../event-context/event-context-utils';
import {withEventValue} from '../utils/dom';
import {VariablePath} from '../variable/VariablePropTypes';
import SelectInt from '../select-int/SelectInt';
import './TimePicker.css';

export default connect(extractMinutesPerUnit, mapDispatchToProps)(TimePicker);

TimePicker.propTypes = {
  variablePath: VariablePath.isRequired,
  timeUnits: React.PropTypes.number.isRequired,
  minutesPerUnit: React.PropTypes.number.isRequired,
  buildHandlers: React.PropTypes.func.isRequired
}

export function TimePicker({ timeUnits, variablePath, minutesPerUnit, buildHandlers }) {
  const handlers = buildHandlers(variablePath, timeUnits, minutesPerUnit);
  const { days, hours, minutes } = toTime(timeUnits, minutesPerUnit)

  return (
    <FormGroup className="TimePicker">
      <SelectInt
        end={7}
        selected={days}
        onChange={handlers.onDayChange(days)}
        display={pad}
      />
      <SelectInt
        end={24}
        selected={hours}
        onChange={handlers.onHourChange(hours)}
        display={pad}
      />
      <SelectInt
        end={60}
        selected={minutes}
        step={minutesPerUnit}
        onChange={handlers.onMinuteChange(minutes)}
        display={pad}
      />
    </FormGroup>
  );
}

function pad(integer) {
  return integer < 10 ? `0${integer}` : String(integer);
}

export function mapDispatchToProps(dispatch) {
  return {
    buildHandlers: (variablePath, timeUnits, minutesPerUnit) => {
      const handle = func => originalValue => withEventValue(value => {
        dispatch(
          updateValue(
            variablePath,
            func(Number(value), originalValue, timeUnits * minutesPerUnit) / minutesPerUnit
          )
        )}
      );
      return {
        onHourChange: handle((hours, oldHours, total) => total + (hours - oldHours) * 60),
        onMinuteChange: handle((minutes, oldMinutes, total) => total + minutes - oldMinutes),
        onDayChange: handle((days, oldDays, total) => total + (days - oldDays) * 60 * 24),
      }
    }
  }
}

function toTime(timeUnits, minutesPerUnit) {
  const totalMinutes = timeUnits * minutesPerUnit;
  const totalHours = totalMinutes / 60;
  const totalDays = totalHours / 24;

  const days = Math.floor(totalDays);
  const hours = Math.floor(totalHours) - 24 * days;
  const minutes = Math.floor(totalMinutes) - (24 * days + hours) * 60;
  return { days, hours, minutes };
}
