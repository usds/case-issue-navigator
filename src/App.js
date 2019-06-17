import React, {Component} from 'react';
import 'uswds';
import './App.css';
import ReceiptList from './view/ReceiptList';
import PrimaryNavMenu from './view/PrimaryNavMenu';
import ModalDialog from './view/ModalDialog';
import * as case_api from "./model/FakeCaseFetcher";

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

class SnoozeForm extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  formChange(e) {
    const stateSetter = {};
    stateSetter[e.target.name] = e.target.value;
    if (e.target.name === "snooze-reason") {
      stateSetter._enabled = true;
    }
    this.setState(stateSetter);
  }

  formSubmit(e) {
    e.preventDefault(); // nobody wants an actual form submission
    this.props.callback.snooze(this.props.rowData, 15);
    this.props.callback.closeDialog();
  }

  render() {
    let buttonText = "Select a Reason";
    if (this.state._enabled) {
      const duration = {
        test_data: 'one year',
        assigned_case: 'five days',
        in_proceedings: 'one month'
      };
      buttonText = "Snooze for " + duration[this.state['snooze-reason']];
    }
    return (
      <form className="usa-form">
        <input id="how" className="usa-checkbox__input" type="checkbox" name="checkybox" value="not" />
        <label className="usa-checkbox__label" htmlFor="how">This is not how you do it</label>
        <label className  ="usa-label" htmlFor="snooze-reason">Reason to snooze this case:</label>
        <select defaultValue={false} onChange={this.formChange.bind(this)} required={true} className="usa-select" name="snooze-reason" id="snooze-reason">
          <option value={false} disabled={true}  hidden={true}>- Select Reason -</option>
          <option value="test_data">Test Data</option>
          <option value="assigned_case">Case has been assigned</option>
          <option value="in_proceedings">Case is pending removal proceedings</option>
        </select>
        <button
            onClick={this.formSubmit.bind(this)}
            className={"usa-button" + (this.state._enabled ? "" : " usa-button--disabled")}>
          {buttonText}
        </button>
      </form>
    );
  }
}

export default App;
