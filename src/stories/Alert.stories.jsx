import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { UsaAlert } from "../view/util/UsaAlert";

storiesOf("UsaAlert", module)
  .add("Success", () => <UsaAlert alertType="success">Well done!</UsaAlert>)
  .add("info", () => (
    <UsaAlert alertType="info">This is some information.</UsaAlert>
  ))
  .add("warning", () => (
    <UsaAlert alertType="warning">Watch out for this!</UsaAlert>
  ))
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
            <UsaAlert key={i} alertType={alert.alertType}>
              {alert.content}{" "}
              <button onClick={() => dismissAlert(alert)}>Dismiss.</button>
            </UsaAlert>
          ))}
        </div>
      );
    };

    return <Container initialAlerts={initialAlerts} />;
  });
