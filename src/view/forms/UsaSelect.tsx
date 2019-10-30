import React, { Fragment } from "react";

interface Option<T> {
  value: T;
  text: string;
}

interface Props<T> {
  name: string;
  id?: string;
  selected?: string;
  placeholder: string;
  onChange: (value: T) => void;
  options: Option<T>[];
  label?: string;
}

export default function UsaSelect<T>(props: Props<T>) {
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

  const renderOption = (option: Option<T>) => {
    const value = String(option.value);
    return (
      <option key={value} value={value}>
        {option.text}
      </option>
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange((e.target.value as any) as T);
  };

  return (
    <Fragment>
      {label}
      <select
        value={props.selected}
        onChange={onChange}
        required={true}
        className="usa-select"
        name={props.name}
        id={selectId}
      >
        {placeholder}
        {props.options.map(renderOption)}
      </select>
    </Fragment>
  );
}
