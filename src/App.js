import React, {Component} from 'react';
import 'uswds';
import './App.css';
import ReceiptList from './view/ReceiptList';
import PrimaryNavMenu from './view/PrimaryNavMenu';
import ModalDialog from './view/ModalDialog';
import fetchAll from "./model/FakeCaseFetcher";

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {cases: fetchAll(), activeNavItem: null, showDialog: false, displayMode: "table"};
    }

    render(){
      const callbacks = {
        delete: this.delete.bind(this),
        details: this.detailView.bind(this),
        closeDialog: this.closeDialog.bind(this),
      };
      let content = <ReceiptList cases={this.state.cases} callback={callbacks} mode={this.state.displayMode} />


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
            modalContent={<SnoozeForm/> }
          />
          {content}
          </main>
        </div>
      );
    }

    setNav(event) {
      this.setState({activeNavItem: event.target.innerText})
    }

    delete(receiptNumber) {
      this.setState(
        {cases: this.state.cases.filter(c => (c.receiptNumber !== receiptNumber))}
      );
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

  render() {
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
        <button  className={"usa-button" + (this.state._enabled ? "" : " usa-button--disabled")}>Do the thing</button>
      </form>
    );
  }
}

export default App;
