import React from "react";

interface Props {
  name: string;
  id: string;
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
}

export default function UsaCheckbox(props: Props) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.checked);
  };

  return (
    <div className="usa-checkbox">
      <input
        className="usa-checkbox__input"
        id={props.id}
        type="checkbox"
        name={props.name}
        onChange={onChange}
        checked={props.value}
      />
      <label className="usa-checkbox__label" htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  );
}
