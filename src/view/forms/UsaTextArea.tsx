import React, { Fragment, ChangeEvent } from "react";

interface UsaTextAreaProps {
  id?: string;
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
}

const UsaTextArea: React.FunctionComponent<UsaTextAreaProps> = props => {
  const elementId = props.id || props.name;
  const label = props.label && (
    <label className="usa-label" htmlFor={elementId}>
      {props.label}
    </label>
  );

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.onChange(e.target.value);
  };

  return (
    <Fragment>
      {label}
      <textarea
        onChange={onChange}
        className="usa-textarea"
        id={elementId}
        name={props.name}
        value={props.value}
      />
    </Fragment>
  );
};

export default UsaTextArea;
