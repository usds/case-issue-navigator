import React from 'react';
import ReceiptDisplayRow from './ReceiptDisplayRow';

const i90_headers = [
    {header: "Receipt", field: "receiptNumber", content: "LINK"},
    {header: "Creation Date", field: "creationDate", content: "DATE"},
    {header: "Case Age", field: "caseAge"},
    {header: "Case State", field: "caseState"},
    {header: "Case Status", field: "caseStatus"},
    {header: "Case Substatus", field: "caseSubstatus"},
    {header: "Application Reason", field: "applicationReason"},
    {header: "Pipeline", field: "i90SP", content: ((d) => (d === "true") ? "SP" : "Legacy")},
    {header: "Filing Channel", field: "channelType"},
    {header: "Actions", field: "_", content: (_, rowData, header, callback)=><button  onClick={()=>callback.details(rowData)} className="usa-button usa-button--outline">Show Actions</button>}
];

export default function ReceiptList(props) {
    if (!props.cases.length) {
        return  <div>No cases found.</div>;
    }
    let header_definitions = i90_headers;
    if (props.view === "Resolved Cases") {
        header_definitions = i90_headers.slice(0,2);
        header_definitions.push(i90_headers[6], i90_headers[7], i90_headers[8])
    } else if (props.view === "Snoozed Cases") {
        header_definitions = [...i90_headers.slice(0,9), {header:"Snooze Duration", field: "snoozed_for"}];
    }
    if (props.mode === "table") {
        return _tabular_list(props, header_definitions);
    } else {
        return _accordion_list(props, header_definitions);
    }
}

function _tabular_list(props, header_definitions) {
    return (
        <table className="usa-table usa-table--borderless">
        <thead>
        <tr>
            {header_definitions.map(h=><th key={h.header}>{h.header}</th>)}
        </tr>
        </thead>
        <tbody>
            {props.cases.map(r=><ReceiptDisplayRow
                key={"ELIS-" + r.caseId}
                data={r}
                headers={header_definitions}
                callback={props.callback} mode="table"/>)}
        </tbody>
    </table>
    );
}

function _accordion_list(props) {
    const rows = props.cases.map(r=><ReceiptDisplayRow
        key={"ELIS-" + r.caseId}
        data={r} callback={props.callback} mode="accordion"/>);
    return <div class="usa-accordion" aria-multiselectable="true">{rows}</div>;
}