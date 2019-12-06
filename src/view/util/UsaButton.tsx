import React from "react";
import "./UsaButton.scss";

type ButtonTypes =
  | "secondary"
  | "accent-cool"
  | "base"
  | "outline"
  | "inverse"
  | "big"
  | "none"
  | "unstyled";

interface Props {
  buttonStyle?: ButtonTypes;
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  buttonId?: string;
}

const UsaButton: React.FunctionComponent<Props> = props => {
  let buttonClass = "usa-button";
  if (props.buttonStyle !== undefined) {
    buttonClass = buttonClass + " usa-button--" + props.buttonStyle;
  }
  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
      id={props.buttonId}
    >
      {props.children}
    </button>
  );
};

UsaButton.defaultProps = {
  disabled: false,
  type: "button"
};

export default UsaButton;
