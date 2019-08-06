import React, { Fragment } from "react";
import PropTypes from "prop-types";

export default function UsaSelect(props) {
  const selectId = props.id || props.name;
  const label = props.children && (
    <label className="usa-label" htmlFor={selectId}>
      {props.children}
    </label>
  );
  const placeholder = props.placeholder && (
    <option value={false} disabled={true} hidden={true}>
      {props.placeholder}
    </option>
  );
  return (
    <Fragment>
      {label}
      <select
        defaultValue={props.selected}
        onChange={props.onChange}
        required={true}
        className="usa-select"
        name={props.name}
        id={selectId}
      >
        {placeholder}
        {props.options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.snoozeReason}
          </option>
        ))}
      </select>
    </Fragment>
  );
}

UsaSelect.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired // should be objectOf, but can't deal yet
};

UsaSelect.defaultProps = {
  selected: false
};
