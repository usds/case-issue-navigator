import React from "react";
import PropTypes from "prop-types";

interface Props {
  alertType: "success" | "info" | "warning" | "error";
}

const UsaAlert: React.FC<Props> = props => (
  <div
    className={`usa-alert--fit-content usa-alert usa-alert--${props.alertType} usa-alert--slim`}
  >
    <div className="usa-alert__body">
      <p className="usa-alert__text">{props.children}</p>
    </div>
  </div>
);

export { UsaAlert };
