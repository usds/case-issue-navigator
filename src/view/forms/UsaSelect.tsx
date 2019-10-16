import React, { Fragment } from "react";

interface Option {
  value: string;
  text: string;
}

interface Props {
  name: string;
  id?: string;
  selected: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  label?: string;
}

export default function UsaSelect(props: Props) {
  const selectId = props.id || props.name;
  const label = props.label && (
    <label className="usa-label" htmlFor={selectId}>
      {props.label}
    </label>
  );
  const placeholder = props.placeholder && (
    <option value="" disabled={true} hidden={true}>
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
            {opt.text}
          </option>
        ))}
      </select>
    </Fragment>
  );
}
