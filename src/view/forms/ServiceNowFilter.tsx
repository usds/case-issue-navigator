import React from "react";
import UsaSelect from "./UsaSelect";
import "./CaseAgeFilter.scss";

interface Props {
  serviceNowFilter?: boolean;
  snoozeState: SnoozeState;
  onUpdate: (serviceNowFilter?: boolean) => void;
}

type trilean = "true" | "false" | "";

interface Option {
  value: trilean;
  text: string;
}

const ServiceNowFilter: React.FunctionComponent<Props> = props => {
  if (props.snoozeState !== "snoozed") {
    return null;
  }

  const options: Option[] = [
    {
      value: "",
      text: "- Show all cases (regardless of service now ticket) -"
    },
    {
      value: "true",
      text: "Has Service Now Ticket"
    },
    {
      value: "false",
      text: "Doesn't Have a Service Now Ticket"
    }
  ];

  const onUpdate = (serviceNowFilter: trilean) => {
    switch(serviceNowFilter){
      case "":
        props.onUpdate();
        return;
      case "true":
          props.onUpdate(true);
          return;
      case "false":
          props.onUpdate(false);
          return;
    }
  }

  return (
    <React.Fragment>
      <UsaSelect
        options={options}
        placeholder="- Show all cases (regardless of service now ticket) -"
        name="serviceNowTicket"
        selected={props.serviceNowFilter === undefined ? "" : props.serviceNowFilter.toString()}
        onChange={onUpdate}
        label="Filter by Has Service Now Ticket"
      />
    </React.Fragment>
  );
};

export { ServiceNowFilter };
