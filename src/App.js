import React, { Component } from "react";
import { Route } from "react-router-dom";
import "uswds";
import "./App.css";
import PrimaryNavMenu from "./view/PrimaryNavMenu";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { UsaAlert } from "./view/util/UsaAlert";
import configureCaseFetcher from "./model/caseFetcher";
import { ActiveCaseList } from "./view/caselists/ActiveCaseList";
import { SnoozedCaseList } from "./view/caselists/SnoozedCaseList";
import { BASE_URL, VIEWS, I90_HEADERS } from "./controller/config";
import { getHeaders } from "./view/util/getHeaders";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

library.add(fas);

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
      summary: null,
      showDialog: false,
      alerts: [],
      dataRefresh: null,
      isLoading: false
    };
  }

  notify = (message, type) => {
    if (toast[type]) {
      return toast[type](message);
    }
    toast(message);
  };

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
          isLoading: false,
          dataRefresh: new Date()
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
        this.setState({
          snoozed_cases: [...this.state.snoozed_cases, ...data],
          isLoading: false,
          dataRefresh: new Date()
        });
      })
      .catch(e => {
        console.error(e.message);
      });
  };

  updateActiveSnooze = (receiptNumber, snoozeOption) => {
    return caseFetcher.updateActiveSnooze(receiptNumber, {
      duration: snoozeOption.duration,
      reason: snoozeOption.reason
    });
  };

  clearActiveCases = () => this.setState({ active_cases: [] });

  clearSnoozedCases = () => this.setState({ snoozed_cases: [] });

  updateSummaryData = () => {
    caseFetcher.getCaseSummary().then(data => {
      const currentlySnoozed = data.CURRENTLY_SNOOZED || 0;
      const neverSnoozed = data.NEVER_SNOOZED || 0;
      const previouslySnoozed = data.PREVIOUSLY_SNOOZED || 0;

      this.setState({
        summary: {
          [VIEWS.CASES_TO_WORK.TITLE]: neverSnoozed + previouslySnoozed,
          [VIEWS.SNOOZED_CASES.TITLE]: currentlySnoozed
        }
      });
    });
  };

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

  snooze = async (rowData, snoozeOption) => {
    try {
      const snoozeData = await this.updateActiveSnooze(rowData.receiptNumber, {
        duration: snoozeOption.duration,
        reason: snoozeOption.value
      });

      this.updateSummaryData();

      const new_snoozed = [
        ...this.state.snoozed_cases,
        _snoozeRow(rowData, snoozeOption)
      ];
      this.setState({
        active_cases: this.state.active_cases.filter(
          c => c.receiptNumber !== rowData.receiptNumber
        ),
        snoozed_cases: new_snoozed.sort(
          (a, b) =>
            new Date(a.snoozeInformation.snoozeEnd) -
            new Date(b.snoozeInformation.snoozeEnd)
        )
      });

      const snoozeDays = Math.ceil(
        (new Date(snoozeData.snoozeEnd) - new Date(snoozeData.snoozeStart)) /
          86400000
      );

      this.notify(
        `${
          rowData.receiptNumber
        } has been Snoozed for ${snoozeDays} day${snoozeDays !== 1 &&
          "s"} due to ${snoozeData.snoozeReason}.`,
        "success"
      );
    } catch (e) {
      this.notify(e.message, "error");
    }
  };

  deSnooze(rowData) {
    let new_active = [...this.state.active_cases];
    new_active.unshift({ ...rowData, desnoozed: true });
    this.setState({
      snoozed_cases: this.state.snoozed_cases.filter(
        c => c.receiptNumber !== rowData.receiptNumber
      ),
      active_cases: new_active
    });
    this.notify(`${rowData.receiptNumber} has been Unsnoozed.`, "info");
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

  componentDidMount() {
    this.updateSummaryData();
  }

  render() {
    const callbacks = {
      snooze: this.snooze,
      details: this.detailView.bind(this),
      closeDialog: this.closeDialog.bind(this),
      snoozeUpdate: this.detailView.bind(this),
      deSnooze: this.deSnooze.bind(this),
      reSnooze: this.reSnooze.bind(this)
    };

    return (
      <div className="case-issue-navigator">
        <ToastContainer />
        <PrimaryNavMenu
          title="Case Issue Navigator"
          views={VIEWS}
          summary={this.state.summary}
        />
        <main id="main-content">
          <p>
            Data sync:{" "}
            {this.state.dataRefresh &&
              `${this.state.dataRefresh.toLocaleDateString(
                "en-US"
              )} ${this.state.dataRefresh.toLocaleTimeString("en-US")}`}
          </p>
          {this.state.alerts.map(alert => (
            <UsaAlert alertType={alert.alertType}>
              {alert.content}{" "}
              <button onClick={() => this.dismissAlert(alert)}>Dismiss</button>.
            </UsaAlert>
          ))}
          <Route
            path={`/${VIEWS.CASES_TO_WORK.ROUTE}`}
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
                headers={getHeaders(I90_HEADERS, VIEWS.CASES_TO_WORK.TITLE)}
              />
            )}
          />
          <Route
            path={`/${VIEWS.SNOOZED_CASES.ROUTE}`}
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
                headers={getHeaders(I90_HEADERS, VIEWS.SNOOZED_CASES.TITLE)}
              />
            )}
          />
        </main>
      </div>
    );
  }
}

function _snoozeRow(rowData, snoozeInformation) {
  return { ...rowData, snoozeInformation };
}

export default App;
