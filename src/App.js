import React, {Component} from 'react';
import 'uswds';
import './App.css';
import ReceiptList from './view/ReceiptList';
import PrimaryNavMenu from './view/PrimaryNavMenu';
import ModalDialog from './view/ModalDialog';
import * as case_api from "./model/FakeCaseFetcher";
import SnoozeForm from './controller/SnoozeForm';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        active_cases: case_api.fetchAll(),
        resolved_cases: case_api.fetchResolved(),
        snoozed_cases : [],
        activeNavItem: null,
        showDialog: false,
        displayMode: "table"
      };
    }

    render(){
      const callbacks = {
        snooze: this.snooze.bind(this),
        details: this.detailView.bind(this),
        closeDialog: this.closeDialog.bind(this),
      };
      let cases = this.state.active_cases;
      if (this.state.activeNavItem === "Snoozed Cases") {
        cases = this.state.snoozed_cases;
      } else if (this.state.activeNavItem === "Resolved Cases") {
        cases = this.state.resolved_cases;
      }

      return (
        <div className="stuck-case-navigator">
          <div className="usa-overlay"></div>
          <PrimaryNavMenu
            title="Stuck Case Navigator"
            items={["Cases to work", "Snoozed Cases", "Resolved Cases"]}
            active_item={this.state.activeNavItem}
            callback={{navSelect: this.setNav.bind(this)}}
            />
          <main id="main-content">
          <ModalDialog
            show={this.state.showDialog}
            modalTitle={this.state.dialogTitle}
            callback={callbacks}
            modalContent={<SnoozeForm callback={callbacks} rowData={this.state.clickedRow} /> }
          />
          <ReceiptList cases={cases} callback={callbacks} mode={this.state.displayMode} />
          </main>
        </div>
      );
    }

    setNav(event) {
      this.setState({activeNavItem: event.target.innerText})
    }

    snooze(rowData, days) {
      this.setState({
        active_cases: this.state.active_cases.filter(c => (c.receiptNumber !== rowData.receiptNumber)),
        snoozed_cases: [...this.state.snoozed_cases, {...rowData, snoozed_for: days}]
      });
    }

    detailView(rowData) {
      this.setState({showDialog: true, dialogTitle: rowData.receiptNumber, clickedRow: rowData});
    }

    closeDialog() {
      this.setState({showDialog: false, clickedRow: null})
    }
}

export default App;
