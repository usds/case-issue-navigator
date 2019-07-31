import React from "react";
import PropTypes from "prop-types";

const UsaAlert = props => (
  <div
    className={`usa-alert--fit-content usa-alert usa-alert--${props.alertType} usa-alert--slim`}
  >
    <div className="usa-alert__body">
      <p className="usa-alert__text">{props.children}</p>
    </div>
  </div>
);

const alertTypes = ["success", "info", "warning", "error"];

UsaAlert.propTypes = {
  alertType: PropTypes.oneOf(alertTypes)
};

export { UsaAlert };
