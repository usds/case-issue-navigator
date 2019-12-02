import React from "react";
import PropTypes from "prop-types";
import "./UsaButton.scss";

const BUTTON_TYPES = [
  "secondary",
  "accent-cool",
  "base",
  "outline",
  "inverse",
  "big",
  "none",
  "unstyled"
];

export default function UsaButton(props) {
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
}

UsaButton.propTypes = {
  buttonStyle: PropTypes.oneOf(BUTTON_TYPES),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  children: PropTypes.any,
  buttonId: PropTypes.string,
};

UsaButton.defaultProps = {
  disabled: false,
  type: "button"
};
