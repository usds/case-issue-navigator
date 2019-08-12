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
import { approximateDays } from "./view/util/approximateDays";

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
        this.setState({ isLoading: false });
        this.notify("There was an error loading cases.", "error");
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
        this.setState({ isLoading: false });
        this.notify("There was an error loading cases.", "error");
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

  snooze = async (rowData, snoozeOption) => {
    try {
      const snoozeData = await this.updateActiveSnooze(rowData.receiptNumber, {
        duration: snoozeOption.duration,
        reason: snoozeOption.value
      });

      this.updateSummaryData();

      const { active_cases, snoozed_cases } = this.state;

      const newSnoozed = snoozed_cases
        .filter(
          snoozedCase => snoozedCase.receiptNumber !== rowData.receiptNumber
        )
        .sort(
          (a, b) =>
            new Date(a.snoozeInformation.snoozeEnd) -
            new Date(b.snoozeInformation.snoozeEnd)
        );

      this.setState({
        active_cases: active_cases.filter(
          c => c.receiptNumber !== rowData.receiptNumber
        ),
        snoozed_cases: newSnoozed
      });

      const snoozeDays = approximateDays({
        startDate: snoozeData.snoozeStart,
        endDate: snoozeData.snoozeEnd
      });

      this.notify(
        `${
          rowData.receiptNumber
        } has been Snoozed for ${snoozeDays} day${snoozeDays !== 1 &&
          "s"} due to ${snoozeData.snoozeReason}.`,
        "success"
      );
    } catch (e) {
      console.error(e.message);
      this.notify(e.message, "error");
    }
  };

  deSnooze = async rowData => {
    try {
      const desnoozed = await caseFetcher.deleteActiveSnooze(
        rowData.receiptNumber
      );

      this.updateSummaryData();

      this.setState({
        snoozed_cases: this.state.snoozed_cases.filter(
          snoozedCase => snoozedCase.receiptNumber !== desnoozed
        )
      });
      this.notify(`${desnoozed} has been Unsnoozed.`, "info");
    } catch (e) {
      this.notify("There was an error unsnoozing this case.", "error");
    }
  };

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
      deSnooze: this.deSnooze,
      reSnooze: this.snooze
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

export default App;
