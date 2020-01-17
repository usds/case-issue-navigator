import React, { Fragment } from "react";

interface Option<T> {
  value: T;
  text: string;
}

interface Props<T> {
  name: string;
  id?: string;
  selected?: T;
  placeholder: string;
  onChange: (value: T) => void;
  options: Option<T>[];
  label?: string;
}

export default function UsaSelect<T>(props: Props<T>) {
  const selectId = props.id || props.name;
  const optionLookup: { [key: string]: T } = {};
  let selected: string | undefined;
  props.options.forEach((element: Option<T>, index: number) => {
    const lookupKey = String(index);
    optionLookup[lookupKey] = element.value;
    if (element.value === props.selected) {
      selected = lookupKey;
    }
  });

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

  const renderOption = (option: Option<T>, index: number) => {
    const lookupKey = String(index);
    return (
      <option key={lookupKey} value={lookupKey}>
        {option.text}
      </option>
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange(optionLookup[e.target.value]);
  };

  return (
    <Fragment>
      {label}
      <select
        value={selected}
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
