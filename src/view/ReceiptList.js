import React from 'react';
import ReceiptDisplayRow from './ReceiptDisplayRow';

export default function ReceiptList(props) {
    if (!props.cases.length) {
        return  <div>No cases found.</div>;
    }
    if (props.mode === "table") {
        return _tabular_list(props);
    } else {
        return _accordion_list(props);
    }
}

function _tabular_list(props) {
    return (
        <table className="usa-table usa-table--borderless">
        <thead>
        <tr>
        <th>Receipt</th><th>Creation Date</th>
            <th>Case Age</th>
            <th>Case State</th><th>Case Status</th><th>Case Substatus</th><th>Application Reason</th>
            <th>Pipeline</th><th>Filing Channel</th>
        </tr>
        </thead>
        <tbody>
            {props.cases.map(r=><ReceiptDisplayRow
                key={"ELIS-" + r.caseId}
                data={r} callback={props.callback} mode="table"/>)}
        </tbody>
    </table>
    );
}

function _accordion_list(props) {
    const rows = props.cases.map(r=><ReceiptDisplayRow
        key={"ELIS-" + r.caseId}
        data={r} callback={props.callback} mode="accordion"/>);
    return <div class="usa-accordion">{rows}</div>;
}