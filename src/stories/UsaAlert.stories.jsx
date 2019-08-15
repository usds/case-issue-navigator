import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { UsaAlert } from "../view/util/UsaAlert";

storiesOf("UsaAlert", module)
  .add("Success", () => <UsaAlert alertType="success" content="Well done!"/>)
  .add("info", () => (
    <UsaAlert alertType="info" content="This is some information."/>
  ))
  .add("warning", () => (
    <UsaAlert alertType="warning" content="Watch out for this!"/>
  ))
  .add("dismissible", () => {
    const initialAlerts = [
      { alertType: "success", content: "This is a success alert." },
      { alertType: "warning", content: "This is a warning alert." }
    ];

    const Container = props => {
      const [alerts, setAlerts] = useState(props.initialAlerts);

      const dismissAlert = selectedAlert => {
        setAlerts(alerts.filter(alert => alert !== selectedAlert));
      };

      return (
        <div>
          {alerts.map((alert, i) => (
            <UsaAlert
              key={i}
              alertType={alert.alertType}
              content={alert.content}
              dismissAlert={() => dismissAlert(alert)}
            />
          ))}
        </div>
      );
    };

    return <Container initialAlerts={initialAlerts} />;
  });
