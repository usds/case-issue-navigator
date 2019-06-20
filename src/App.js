import React, {Component} from 'react';
import 'uswds';
import './App.css';
import ReceiptList from './view/ReceiptList';
import PrimaryNavMenu from './view/PrimaryNavMenu';
import ModalDialog from './view/ModalDialog';
import * as case_api from "./model/FakeCaseFetcher";
import SnoozeForm from './controller/SnoozeForm';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas);

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
        snoozeUpdate: this.detailView.bind(this),
        deSnooze: this.deSnooze.bind(this),
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
            modalContent={this.state.activeNavItem !== "Snoozed Cases" 
               ? <SnoozeForm callback={callbacks} rowData={this.state.clickedRow} /> 
               : <DeSnoozeForm callback={callbacks} rowData={this.state.clickedRow} />
              }
          />
          <ReceiptList cases={cases} callback={callbacks} mode={this.state.displayMode} view={this.state.activeNavItem}/>
          </main>
        </div>
      );
    }

    setNav(event) {
      this.setState({activeNavItem: event.target.innerText})
    }

    snooze(rowData, snooze_option, snooze_text) {
      const new_snoozed = [...this.state.snoozed_cases, {...rowData, snooze_option: snooze_option, snooze_followup: snooze_text}]
      this.setState({
        active_cases: this.state.active_cases.filter(c => (c.receiptNumber !== rowData.receiptNumber)),
        snoozed_cases: new_snoozed.sort((a,b)=>(a.snooze_option.snooze_days - b.snooze_option.snooze_days))
      });
    }
    deSnooze(rowData) {
      let new_active = [...this.state.active_cases];
      new_active.unshift({...rowData, desnoozed: true});
      this.setState({
        snoozed_cases: this.state.snoozed_cases.filter(c => (c.receiptNumber !== rowData.receiptNumber)),
        active_cases: new_active,
      });
    }
    detailView(rowData) {
      this.setState({showDialog: true, dialogTitle: rowData.receiptNumber, clickedRow: rowData});
    }

    closeDialog() {
      this.setState({showDialog: false, clickedRow: null})
    }
}

function DeSnoozeForm(props) {
  const rowData = props.rowData;
  const updateSubform = rowData.snooze_option.follow_up === undefined ? <></> : (
    <div>
      <label className="usa-label" htmlFor="snooze-follow-up">{rowData.snooze_option.follow_up}</label>
      <input className="usa-input" id="snooze-follow-up" name="snooze-follow-up" type="text" value={rowData.snooze_followup}></input>
      <button className="usa-button usa-button--cool-accent" onClick={(e)=>e.preventDefault()}>
            Update
      </button>
      <hr/>
    </div>
  );
  const desnooze = (e) => {
    e.preventDefault();
    props.callback.deSnooze(rowData);
    props.callback.closeDialog();
  };
  return (
    <form className="usa-form">
      {updateSubform}
      <button
          onClick={desnooze}
          className={"usa-button usa-button--secondary"}>
                  End Snooze
      </button>
    </form>
  );
}

export default App;
