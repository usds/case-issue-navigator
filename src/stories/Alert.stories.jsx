import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { Alert } from "../view/util/Alert";

storiesOf("Alert", module)
  .add("Success", () => <Alert alertType="success">Well done!</Alert>)
  .add("info", () => <Alert alertType="info">This is some information.</Alert>)
  .add("warning", () => <Alert alertType="warning">Watch out for this!</Alert>)
  .add("dismissible", () => {
    const initialAlerts = [
      { alertType: "success", content: "This is a success alert." },
      { alertType: "warning", content: "This is a warning alert" }
    ];

    const Container = props => {
      const [alerts, setAlerts] = useState(props.initialAlerts);

      const dismissAlert = selectedAlert => {
        setAlerts(alerts.filter(alert => alert !== selectedAlert));
      };

      return (
        <div>
          {alerts.map((alert, i) => (
            <Alert key={i} alertType={alert.alertType}>
              {alert.content}{" "}
              <button onClick={() => dismissAlert(alert)}>Dismiss.</button>
            </Alert>
          ))}
        </div>
      );
    };

    return <Container initialAlerts={initialAlerts} />;
  });
