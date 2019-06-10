import React from 'react';
import './App.css';
import ReceiptDisplayRow from './view/ReceiptDisplayRow';
import fetchAll from "./model/FakeCaseFetcher";

function App() {
  return (
    <div className="stuck-case-navigator">
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
          {fetchAll().map(ReceiptDisplayRow)}
        </tbody>
      </table>
    </div>
  );
}

export default App;
