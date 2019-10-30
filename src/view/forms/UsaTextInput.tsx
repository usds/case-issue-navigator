import React, { Fragment } from "react";

interface Props {
  name: string;
  id?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function UsaTextInput(props: Props) {
  const elementId = props.id || props.name;
  const label = props.label && (
    <label className="usa-label" htmlFor={elementId}>
      {props.label}
    </label>
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value);
  };

  return (
    <Fragment>
      {label}
      <input
        onChange={onChange}
        className="usa-input"
        type="text"
        id={elementId}
        name={props.name}
        value={props.value}
      />
    </Fragment>
  );
}
