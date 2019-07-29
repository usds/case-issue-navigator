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
    field: "caseAge",
    views: [CASES_TO_WORK, SNOOZED_CASES],
    content: d => `${d} day${d !== 0 && "s"}`
  },
  {
    header: "Case Creation",
    field: "creationDate",
    content: "DATE",
    views: [CASES_TO_WORK, SNOOZED_CASES]
  },
  { header: "Case Status", field: "caseStatus", views: [CASES_TO_WORK] },
  { header: "Case Substatus", field: "caseSubstatus", views: [CASES_TO_WORK] },
  {
    header: "Platform",
    field: "i90SP",
    content: d => (d === "true" ? "SP" : "Legacy"),
    views: [CASES_TO_WORK, SNOOZED_CASES]
  },
  {
    header: "Problem",
    field: "snooze_option",
    content: o => o.short_text,
    views: [SNOOZED_CASES]
  },
  {
    header: "Snoozed",
    field: "snooze_option",
    content: o => `${o.snooze_days} day${o.snooze_days !== 1 && "s"} left`,
    views: [SNOOZED_CASES]
  },
  {
    header: "Assigned",
    field: "assigned",
    views: [CASES_TO_WORK, SNOOZED_CASES]
  },
  { header: "SN Ticket #", field: "sn_ticket", views: [SNOOZED_CASES] },
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
    return <div>No cases found.</div>;
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
    <table className="usa-table usa-table--borderless">
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
            key={"ELIS-" + r.caseId}
            data={r}
            headers={props.header_definitions}
            callback={props.callback}
          />
        ))}
      </tbody>
    </table>
  );
};
