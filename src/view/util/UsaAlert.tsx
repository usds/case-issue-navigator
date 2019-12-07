import React from "react";
import "./UsaAlert.scss";

interface Props {
  heading?: string | JSX.Element;
  text?: string | JSX.Element;
  alertType: "success" | "info" | "warning" | "error";
}

const UsaAlert: React.FC<Props> = props => {
  const heading = props.heading ? (
    <h3 className="usa-alert__heading">{props.heading}</h3>
  ) : null;
  const text = props.text ? (
    <p className="usa-alert__text">{props.text}</p>
  ) : null;

  return (
    <div className={`usa-alert usa-alert--${props.alertType} usa-alert--fit-content`}>
      <div className="usa-alert__body">
        {heading}
        {text}
      </div>
    </div>
  );
};

export { UsaAlert };
