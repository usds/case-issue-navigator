import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


// this should come from the DB
const elisCaseUrlBase = "https://internal-prod-elis2.uscis.dhs.gov/InternalApp/app/#/case/";

const cellDispatch = {
    LINK: ((r, rowData)=> (<>
        <a href={elisCaseUrlBase + r} target="_elis_viewer">{r}</a>
        {rowData.desnoozed ? <FontAwesomeIcon icon="exclamation-triangle" className="text-accent-warm" /> : null }
    </>
    )),
    DATE: (d => {
        const datum = new Date(d);
        return (datum.getMonth() + 1) + "/" + datum.getDate() + "/" + datum.getFullYear();
    }),
};

export default function ReceiptDisplayRow(props) {
    const rowData = props.data;
    return (props.mode === "table" ? _table_row : _accordion_row)(rowData, props.callback, props.headers)
}

function _table_cell(rowData, header, callback) {
    let datum = rowData[header.field];
    if (header.content !== undefined) {
        const processor = ("function" === typeof header.content) ?  header.content : cellDispatch[header.content];
        datum = processor(datum, rowData, header, callback);
    }
    return <td key={header.header}>{datum}</td>
}

function _table_row(rowData, callback, headers) {
    return <tr>{headers.map(h=>_table_cell(rowData, h, callback))}</tr>
}

function _accordion_row(rowData, callback, headers) {
    const item_key = "ELIS-" + rowData.caseId;
    const caseUrl = elisCaseUrlBase + rowData.receiptNumber;
    return (
        <div key={item_key} class="grid-container">
            <h2 class="usa-accordion__heading ">
                <button class="usa-accordion__button grid-row"
                    aria-controls={item_key} aria-expanded="false">
                    {_gridcol(rowData.receiptNumber)}
                    {_gridcol(cellDispatch.DATE(rowData.creationDate))}
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