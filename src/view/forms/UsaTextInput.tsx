import React, { Fragment } from "react";
import classnames from "classnames";

interface Props {
  name: string;
  id?: string;
  value: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClick?: () => void;
  label?: string;
  className?: string;
  readOnly?: boolean;
}

export default function UsaTextInput(props: Props) {
  const elementId = props.id || props.name;
  const label = props.label && (
    <label className="usa-label" htmlFor={elementId}>
      {props.label}
    </label>
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange && props.onChange(e.target.value);
  };

  const classNames = classnames("usa-input", props.className);

  return (
    <Fragment>
      {label}
      <input
        onChange={onChange}
        className={classNames}
        type="text"
        id={elementId}
        name={props.name}
        value={props.value}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onClick={props.onClick}
        readOnly={props.readOnly}
      />
    </Fragment>
  );
}
