import React, { ChangeEvent } from "react";

interface UsaCheckboxProps {
  id?: string;
  name: string;
  checked: boolean;
  label?: string;
  value?: string;
  onChange: (event: ChangeEvent) => void;
}

const UsaCheckbox: React.FunctionComponent<UsaCheckboxProps> = props => {
  const id = props.id || props.name;
  const value = props.value || props.name;
  return (
    <React.Fragment>
      <input
        className="usa-checkbox__input"
        id={id}
        type="checkbox"
        name={props.name}
        value={value}
        checked={props.checked}
        onChange={props.onChange}
      />
      <label className="usa-checkbox__label" htmlFor={id}>
        {props.label || ""}
      </label>
    </React.Fragment>
  );
};

export { UsaCheckbox };
