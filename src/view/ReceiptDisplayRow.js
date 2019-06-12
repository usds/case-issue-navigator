import React from 'react';

export default function ReceiptDisplayRow(props) {
    const rowData = props.data;
    const datey = new Date(rowData.creationDate);
    const caseUrl = "https://internal-prod-elis2.uscis.dhs.gov/InternalApp/app/#/case/" + rowData.receiptNumber;
    return (props.mode === "table" ? _table_row : _accordion_row)(rowData, datey, caseUrl, props.callback)
}

function _table_row(rowData, creationDate, caseUrl, callback) {
    return (
        <tr key={"ELIS-" + rowData.caseId} onClick={()=>callback.details(rowData)}>
            <td>
                <a href={caseUrl} target="_elis_viewer">{rowData.receiptNumber}</a>
            </td>
            <td>{creationDate.getMonth()}/{creationDate.getDate()}/{creationDate.getFullYear()}</td>
            <td>{rowData.caseAge}</td>
            <td>{rowData.caseState}</td>
            <td>{rowData.caseStatus}</td>
            <td>{rowData.caseSubstatus}</td>
            <td>{rowData.applicationReason}</td>
            <td>{(rowData.i90SP === 'true') ? 'SP' : 'Legacy'}</td>
            <td>{rowData.channelType}</td>
        </tr>
    );
}

function _accordion_row(rowData, creationDate, caseUrl, callback) {
    const item_key = "ELIS-" + rowData.caseId;
    return (
        <div key={item_key} class="grid-container">
            <h2 class="usa-accordion__heading ">
                <button class="usa-accordion__button grid-row"
                    aria-controls={item_key}>
                    {_gridcol(rowData.receiptNumber)}
                    {_gridcol(creationDate.getMonth() +'/' + creationDate.getDate() +'/' + creationDate.getFullYear())}
                    {_gridcol(rowData.caseState)}
                </button>
            </h2>
            <div id={item_key} className="usa-accordion__content">
                <div className="grid-row">
                    <div class="grid-col"><a href={caseUrl} target="_elis_viewer">Open in ELIS</a></div>
                    {_gridcol(rowData.i90SP === 'true' ? 'SP' : 'Legacy')}
                    {_gridcol(rowData.caseAge)}
                </div>
                <div className="grid-row">
                    {_gridcol(rowData.caseState)}
                    {_gridcol(rowData.caseStatus)}
                    {_gridcol(rowData.caseSubstatus)}
                </div>
            </div>
        </div>
    );
}

function _gridcol(content) {
    return <div class="grid-col">{content}</div>
}