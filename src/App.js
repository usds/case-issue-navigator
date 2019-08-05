import React, { Component, useState, useEffect } from "react";
import { Route } from "react-router-dom";
import "uswds";
import "./App.css";
import ReceiptList from "./view/ReceiptList";
import PrimaryNavMenu from "./view/PrimaryNavMenu";
import SnoozeForm from "./controller/SnoozeForm";
import DeSnoozeForm from "./controller/DeSnoozeForm";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { UsaAlert } from "./view/util/UsaAlert";
import { ActionModal } from "./view/util/ActionModal";
import configureCaseFetcher from "./model/caseFetcher";
import UsaButton from "./view/util/UsaButton";

library.add(fas);

const ACTIVE_CASES_AT_START = 19171;
const BASE_URL = "http://localhost:8080";
const caseFetcher = configureCaseFetcher({
  baseUrl: BASE_URL,
  resultsPerPage: 20
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active_cases: [],
      snoozed_cases: [],
      showDialog: false,
      alerts: []
    };
  }

  loadActiveCases = page => {
    if (page === 0) {
      this.clearActiveCases();
    }

    this.setState({ isLoading: true });
    caseFetcher
      .getActiveCases(page)
      .then(data => {
        this.setState({
          active_cases: [...this.state.active_cases, ...data],
          isLoading: false
        });
      })
      .catch(e => {
        console.error(e.message);
      });
  };

  loadSnoozedCases = page => {
    if (page === 0) {
      this.clearSnoozedCases();
    }

    this.setState({ isLoading: true });
    caseFetcher
      .getSnoozedCases(page)
      .then(data => {
        console.log(data);
        this.setState({
          snoozed_cases: [...this.state.snoozed_cases, ...data],
          isLoading: false
        });
      })
      .catch(e => {
        console.error(e.message);
      });
  };

  clearActiveCases = () => this.setState({ active_cases: [] });

  clearSnoozedCases = () => this.setState({ snoozed_cases: [] });

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
          <p className="text-italic">Data last refreshed: June 17th, 2019</p>
          {this.state.alerts.map(alert => (
            <UsaAlert alertType={alert.alertType}>
              {alert.content}{" "}
              <button onClick={() => this.dismissAlert(alert)}>Dismiss</button>.
            </UsaAlert>
          ))}
          <Route
            path="/Cases to work"
            render={props => (
              <ActiveCaseList
                {...props}
                showDialog={this.state.showDialog}
                dialogTitle={this.state.dialogTitle}
                callbacks={callbacks}
                clickedRow={this.state.clickedRow}
                cases={this.state.active_cases}
                isLoading={this.state.isLoading}
                loadCases={this.loadActiveCases}
              />
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
                isLoading={this.state.isLoading}
                loadCases={this.loadSnoozedCases}
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
          }.`
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
          content: `${rowData.receiptNumber} has been Unsnoozed.`
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
  const { loadCases } = props;
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    loadCases(currentPage);
  }, [loadCases, currentPage]);

  return (
    <React.Fragment>
      {props.showDialog && (
        <ActionModal
          isOpen={props.showDialog}
          title={props.dialogTitle}
          closeModal={props.callbacks.closeDialog}
        >
          <SnoozeForm callback={props.callbacks} rowData={props.clickedRow} />
        </ActionModal>
      )}
      <ReceiptList
        cases={props.cases}
        callback={props.callbacks}
        view="Cases to work"
        isLoading={props.isLoading}
      />
      <UsaButton onClick={() => setCurrentPage(currentPage + 1)}>
        Load More Cases
      </UsaButton>
    </React.Fragment>
  );
}

function SnoozedCaseList(props) {
  const { loadCases } = props;
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    loadCases(currentPage);
  }, [loadCases, currentPage]);

  return (
    <React.Fragment>
      {props.showDialog && (
        <ActionModal
          isOpen={props.showDialog}
          title={props.dialogTitle}
          closeModal={props.callbacks.closeDialog}
        >
          <DeSnoozeForm callback={props.callbacks} rowData={props.clickedRow} />
        </ActionModal>
      )}
      <ReceiptList
        cases={props.cases}
        callback={props.callbacks}
        view="Snoozed Cases"
      />
      <UsaButton onClick={() => setCurrentPage(currentPage + 1)}>
        Load More Cases
      </UsaButton>
    </React.Fragment>
  );
}

function _snoozeRow(rowData, option, follow_up_text) {
  return { ...rowData, snooze_option: option, snooze_followup: follow_up_text };
}

export default App;
