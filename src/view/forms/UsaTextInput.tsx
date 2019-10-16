import React, { Fragment } from "react";

interface Props {
  name: string;
  id?: string;
  defaultValue?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

export default function UsaTextInput(props: Props) {
  const elementId = props.id || props.name;
  const label = props.label && (
    <label className="usa-label" htmlFor={elementId}>
      {props.label}
    </label>
  );
  return (
    <Fragment>
      {label}
      <input
        onChange={props.onChange}
        className="usa-input"
        type="text"
        id={elementId}
        name={props.name}
        defaultValue={props.defaultValue}
      />
    </Fragment>
  );
}
