import React, { Component } from "react";
import { Route } from "react-router-dom";
import "uswds";
import "./App.css";
import ReceiptList, { CASES_TO_WORK, SNOOZED_CASES } from "./view/ReceiptList";
import PrimaryNavMenu from "./view/PrimaryNavMenu";
import ModalDialog from "./view/ModalDialog";
import * as case_api from "./model/FakeCaseFetcher";
import SnoozeForm from "./controller/SnoozeForm";
import DeSnoozeForm from "./controller/DeSnoozeForm";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Alert } from "./view/util/Alert";

library.add(fas);

const ACTIVE_CASES_AT_START = 19171;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active_cases: case_api.fetchAll(),
      snoozed_cases: [],
      showDialog: false,
      alerts: []
    };
  }

  render() {
    const callbacks = {
      snooze: this.snooze.bind(this),
      details: this.detailView.bind(this),
      closeDialog: this.closeDialog.bind(this),
      snoozeUpdate: this.detailView.bind(this),
      deSnooze: this.deSnooze.bind(this),
      reSnooze: this.reSnooze.bind(this)
    };

    const case_count = {
      "Snoozed Cases": this.state.snoozed_cases.length,
      "Cases to work": ACTIVE_CASES_AT_START - this.state.snoozed_cases.length
    };

    return (
      <div className="case-issue-navigator">
        <PrimaryNavMenu
          title="Case Issue Navigator"
          items={["Cases to work", "Snoozed Cases"]}
          case_count={case_count}
        />
        <main id="main-content">
          <Route
            path="/Cases to work"
            render={props => (
              <React.Fragment>
                <ActiveCaseList
                  {...props}
                  showDialog={this.state.showDialog}
                  dialogTitle={this.state.dialogTitle}
                  callbacks={callbacks}
                  clickedRow={this.state.clickedRow}
                  cases={this.state.active_cases}
                  alerts={this.state.alerts}
                  dismissAlert={this.dismissAlert}
                />
              </React.Fragment>
            )}
          />
          <Route
            path="/Snoozed Cases"
            render={props => (
              <SnoozedCaseList
                {...props}
                showDialog={this.state.showDialog}
                dialogTitle={this.state.dialogTitle}
                callbacks={callbacks}
                clickedRow={this.state.clickedRow}
                cases={this.state.snoozed_cases}
                alerts={this.state.alerts}
                dismissAlert={this.dismissAlert}
              />
            )}
          />
        </main>
      </div>
    );
  }

  dismissAlert = selectedAlert => {
    this.setState({
      alerts: this.state.alerts.filter(alert => alert !== selectedAlert)
    });
  };

  reSnooze(rowData, snooze_option, snooze_text) {
    const new_snooze = this.state.snoozed_cases.filter(
      c => c.receiptNumber !== rowData.receiptNumber
    );
    new_snooze.push(_snoozeRow(rowData, snooze_option, snooze_text));
    this.setState({ snoozed_cases: new_snooze });
  }

  snooze(rowData, snooze_option, snooze_text) {
    console.log(rowData, snooze_option, snooze_text);
    const new_snoozed = [
      ...this.state.snoozed_cases,
      _snoozeRow(rowData, snooze_option, snooze_text)
    ];
    this.setState({
      active_cases: this.state.active_cases.filter(
        c => c.receiptNumber !== rowData.receiptNumber
      ),
      snoozed_cases: new_snoozed.sort(
        (a, b) => a.snooze_option.snooze_days - b.snooze_option.snooze_days
      ),
      alerts: [
        {
          alertType: "success",
          content: `${rowData.receiptNumber} has been Snoozed for ${
            snooze_option.snooze_days
          } day${snooze_option.snooze_days !== 1 && "s"} due to ${
            snooze_option.short_text
          }.`,
          views: [CASES_TO_WORK]
        },
        ...this.state.alerts
      ]
    });
  }

  deSnooze(rowData) {
    let new_active = [...this.state.active_cases];
    new_active.unshift({ ...rowData, desnoozed: true });
    this.setState({
      snoozed_cases: this.state.snoozed_cases.filter(
        c => c.receiptNumber !== rowData.receiptNumber
      ),
      active_cases: new_active,
      alerts: [
        {
          alertType: "info",
          content: `${rowData.receiptNumber} has been Unsnoozed.`,
          views: [SNOOZED_CASES]
        },
        ...this.state.alerts
      ]
    });
  }
  detailView(rowData) {
    this.setState({
      showDialog: true,
      dialogTitle: rowData.receiptNumber,
      clickedRow: rowData
    });
  }

  closeDialog() {
    this.setState({ showDialog: false, clickedRow: null });
  }
}

function ActiveCaseList(props) {
  return (
    <React.Fragment>
      <ModalDialog
        show={props.showDialog}
        modalTitle={props.dialogTitle}
        callback={props.callbacks}
        modalContent={
          <SnoozeForm callback={props.callbacks} rowData={props.clickedRow} />
        }
      />
      <p className="text-italic">Data last refreshed: June 17th, 2019</p>
      {props.alerts
        .filter(alert => alert.views.includes(CASES_TO_WORK))
        .map(alert => (
          <Alert alertType={alert.alertType}>
            {alert.content}{" "}
            <button onClick={() => props.dismissAlert(alert)}>Dismiss</button>.
          </Alert>
        ))}
      <ReceiptList
        cases={props.cases}
        callback={props.callbacks}
        view="Cases to work"
      />
    </React.Fragment>
  );
}

function SnoozedCaseList(props) {
  return (
    <React.Fragment>
      <ModalDialog
        show={props.showDialog}
        modalTitle={props.dialogTitle}
        callback={props.callbacks}
        modalContent={
          <DeSnoozeForm callback={props.callbacks} rowData={props.clickedRow} />
        }
      />
      <p className="text-italic">Data last refreshed: June 17th, 2019</p>
      {props.alerts
        .filter(alert => alert.views.includes(SNOOZED_CASES))
        .map(alert => (
          <Alert alertType={alert.alertType}>
            {alert.content}{" "}
            <button onClick={() => props.dismissAlert(alert)}>Dismiss</button>.
          </Alert>
        ))}
      <ReceiptList
        cases={props.cases}
        callback={props.callbacks}
        view="Snoozed Cases"
      />
    </React.Fragment>
  );
}

function _snoozeRow(rowData, option, follow_up_text) {
  return { ...rowData, snooze_option: option, snooze_followup: follow_up_text };
}

export default App;
