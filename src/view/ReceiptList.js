import React from "react";
import ReceiptDisplayRow from "./ReceiptDisplayRow";
import UsaButton from "./util/UsaButton";

const CASES_TO_WORK = "CASES_TO_WORK";
const SNOOZED_CASES = "SNOOZED_CASES";

function buttonizer(text, buttonClass, callbackKey) {
  return (_, rowData, __, callback) => (
    <UsaButton
      onClick={() => callback[callbackKey](rowData)}
      buttonStyle={buttonClass}
    >
      {text}
    </UsaButton>
  );
}
const i90_headers = [
  {
    header: "Receipt Number",
    field: "receiptNumber",
    content: "LINK",
    views: [CASES_TO_WORK, SNOOZED_CASES]
  },
  {
    header: "Case Age",
    field: "caseCreation",
    views: [CASES_TO_WORK, SNOOZED_CASES],
    content: d => {
      const days = Math.ceil((new Date() - new Date(d)) / 86400000);
      const plural = days === 1 ? "" : "s";
      return `${days} day${plural}`;
    }
  },
  {
    header: "Case Creation",
    field: "caseCreation",
    content: "DATE",
    views: [CASES_TO_WORK, SNOOZED_CASES]
  },
  {
    header: "Case Status",
    field: "extraData",
    content: field => field.caseStatus,
    views: [CASES_TO_WORK]
  },
  {
    header: "Case Substatus",
    field: "extraData",
    content: field => field.caseSubstatus,
    views: [CASES_TO_WORK]
  },
  {
    header: "Platform",
    field: "extraData",
    content: d => (d.streamlinedProcess === "true" ? "SP" : "Legacy"),
    views: [CASES_TO_WORK, SNOOZED_CASES]
  },
  {
    header: "Problem",
    field: "snoozeInformation",
    content: field => field.snoozeReason,
    views: [SNOOZED_CASES]
  },
  {
    header: "Snoozed",
    field: "snoozeInformation",
    content: field => {
      const days = Math.ceil(
        (new Date(field.snoozeEnd) - new Date()) / 86400000
      );
      const plural = days === 1 ? "" : "s";
      return `${days} day${plural}`;
    },
    views: [SNOOZED_CASES]
  },
  {
    header: "Assigned",
    field: "assigned",
    views: [CASES_TO_WORK, SNOOZED_CASES]
  },
  {
    header: "SN Ticket #",
    field: "snoozeInformation",
    content: field => {
      // TODO: Only return snoozeDetails that match Regex
      return field.snoozeDetails;
    },
    views: [SNOOZED_CASES]
  },
  {
    header: "Actions",
    field: "_",
    content: buttonizer("Snooze", "outline", "details"),
    views: [CASES_TO_WORK]
  },
  {
    header: "Actions",
    field: "snooze_option",
    content: buttonizer("Update", "outline", "snoozeUpdate"),
    views: [SNOOZED_CASES]
  }
];

const getCases = view =>
  i90_headers.filter(header => header.views.includes(view));

export default function ReceiptList(props) {
  if (!props.cases.length) {
    return <p>{props.isLoading ? "Loading..." : "No cases found."}</p>;
  }
  let header_definitions;
  if (props.view === "Snoozed Cases") {
    header_definitions = getCases(SNOOZED_CASES);
  }

  if (props.view === "Cases to work") {
    header_definitions = getCases(CASES_TO_WORK);
  }

  return (
    <TabularList
      cases={props.cases}
      callback={props.callback}
      header_definitions={header_definitions}
    />
  );
}

const TabularList = props => {
  return (
    <table className="usa-table usa-table--borderless width-full">
      <thead>
        <tr>
          {props.header_definitions.map(h => (
            <th key={h.header}>{h.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.cases.map(r => (
          <ReceiptDisplayRow
            key={"ELIS-" + r.receiptNumber}
            data={r}
            headers={props.header_definitions}
            callback={props.callback}
          />
        ))}
      </tbody>
    </table>
  );
};
