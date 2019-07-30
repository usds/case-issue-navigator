import React from "react";
import PropTypes from "prop-types";

const Alert = props => (
  <div
    className={`usa-alert--fit-content usa-alert usa-alert--${props.alertType} usa-alert--slim`}
  >
    <div className="usa-alert__body">
      <p className="usa-alert__text">{props.children}</p>
    </div>
  </div>
);

const alertTypes = ["success", "info", "warning", "error"];

Alert.propTypes = {
  alertType: PropTypes.oneOf(alertTypes)
};

export { Alert };
