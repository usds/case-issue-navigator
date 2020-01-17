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

const DEFAULT_TEXT = "- Show all cases -";

const ServiceNowFilter: React.FunctionComponent<Props> = props => {
  if (props.snoozeState !== "SNOOZED") {
    return null;
  }

  const options: Option[] = [
    {
      value: "",
      text: DEFAULT_TEXT
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
    switch (serviceNowFilter) {
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
  };

  const toString = (serviceNowFilter: boolean | undefined): trilean => {
    switch (serviceNowFilter) {
      case undefined:
        return "";
      case true:
        return "true";
      case false:
        return "false";
    }
  };

  return (
    <React.Fragment>
      <UsaSelect
        options={options}
        placeholder={DEFAULT_TEXT}
        name="serviceNowTicket"
        selected={toString(props.serviceNowFilter)}
        onChange={onUpdate}
        label="Has Service Now Ticket"
      />
    </React.Fragment>
  );
};

export { ServiceNowFilter };
