import React from "react";
import PropTypes from "prop-types";

const dismissAction = dismissAlert => {
  if (!dismissAlert) {
    return null;
  }
  return <button onClick={dismissAlert}>Dismiss</button>;
};

const UsaAlert = props => (
  <div
    className={`usa-alert--fit-content usa-alert usa-alert--${props.alertType} usa-alert--slim`}
  >
    <div className="usa-alert__body">
      <p className="usa-alert__text">
        {props.content} {dismissAction(props.dismissAlert)}
      </p>
    </div>
  </div>
);

const alertTypes = ["success", "info", "warning", "error"];

UsaAlert.propTypes = {
  alertType: PropTypes.oneOf(alertTypes).isRequired,
  content: PropTypes.string.isRequired,
  dismissAlert: PropTypes.func
};

export { UsaAlert };
