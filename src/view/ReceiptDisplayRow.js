import React from 'react';

export default function ReceiptDisplayRow(props) {
    const caseUrl = "https://internal-prod-elis2.uscis.dhs.gov/InternalApp/app/#/case/" + props.receiptNumber;
    const datey = new Date(props.creationDate);
    //channelType,i90SP,caseState,caseStatus,caseSubstatus,applicationReason,caseAge
    return (
        <tr key={"ELIS-" + props.caseId}>
            <td>
                <a href={caseUrl} target="_elis_viewer">
                    {props.receiptNumber}</a>
            </td>
            <td>{datey.toUTCString()}</td>
            <td>{props.caseAge}</td>
            <td>{props.caseState}</td>
            <td>{props.caseStatus}</td>
            <td>{props.caseSubstatus}</td>
            <td>{props.applicationReason}</td>
            <td>{(props.i90SP === 'true') ? 'SP' : 'Legacy'}</td>
            <td>{props.channelType}</td>
        </tr>
    );
}