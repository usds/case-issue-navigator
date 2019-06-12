import React from 'react';

export default function CaseDetail(props) {
    return <div className="usa">{props.caseData.receiptNumber} <span onClick={props.callback.backToList}>DONE</span></div>
}
