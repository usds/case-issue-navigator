import React, { Fragment, useState, useEffect } from "react";

interface Props {
  name: string;
  id?: string;
  value: number | undefined;
  onChange: (value?: number) => void;
  label: string;
  min: number;
  max: number;
  setError: (key: string, value: string) => void;
  deleteError: (key: string) => void;
  requiredText?: string;
}

export default function UsaTextInput(props: Props) {
  const [error, setErrorState] = useState("");

  const elementId = props.id || props.name;
  const { value, min, max, label } = props;

  const setError = (error: string) => {
    setErrorState(error);
  };

  useEffect(() => {
    if (value === undefined) {
      setError(
        props.requiredText ? props.requiredText : "This field is required"
      );
    } else if (value < min) {
      setError(`Enter a number greater than ${min}`);
    } else if (value > max) {
      setError(`Enter a number less than ${max}`);
    } else {
      setError("");
    }
  }, [value, max, min, props.requiredText]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(e.target.value);
    props.onChange(isNaN(numValue) ? undefined : numValue);
  };

  const renderLabel = () => {
    const classes = ["usa-label"];
    if (error) {
      classes.push("usa-label--error");
    }
    return (
      <label className={classes.join(" ")} htmlFor={elementId}>
        {label}
      </label>
    );
  };

  const renderInput = () => {
    const classes = ["usa-input"];
    if (error) {
      classes.push("usa-input--error");
    }
    return (
      <input
        onChange={onChange}
        className={classes.join(" ")}
        type="number"
        id={elementId}
        name={props.name}
        value={value ? value : ""}
        min={min}
        max={max}
      />
    );
  };

  if (error) {
    return (
      <div className="usa-form-group usa-form-group--error">
        {renderLabel()}
        <span
          className="usa-error-message"
          id={`${elementId}-error-message`}
          role="alert"
        >
          {error}
        </span>
        {renderInput()}
      </div>
    );
  } else {
    return (
      <Fragment>
        {renderLabel()}
        {renderInput()}
      </Fragment>
    );
  }
}
