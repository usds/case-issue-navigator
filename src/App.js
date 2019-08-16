import React, { Component } from "react";
import { Route } from "react-router-dom";
import "uswds";
import "./App.css";
import PrimaryNavMenu from "./view/PrimaryNavMenu";
import FormattedDate from "./view/util/FormattedDate";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { UsaAlert } from "./view/util/UsaAlert";
import caseFetcher from "./model/caseFetcher";
import { ActiveCaseList } from "./view/caselists/ActiveCaseList";
import { SnoozedCaseList } from "./view/caselists/SnoozedCaseList";
import { VIEWS, I90_HEADERS } from "./controller/config";
import { getHeaders } from "./view/util/getHeaders";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { approximateDays } from "./view/util/approximateDays";

library.add(fas);

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

  updateSummaryData = async () => {
    try {
      const summary = await caseFetcher.getCaseSummary();

      const currentlySnoozed = summary.CURRENTLY_SNOOZED || 0;
      const neverSnoozed = summary.NEVER_SNOOZED || 0;
      const previouslySnoozed = summary.PREVIOUSLY_SNOOZED || 0;

      this.setState({
        summary: {
          [VIEWS.CASES_TO_WORK.TITLE]: neverSnoozed + previouslySnoozed,
          [VIEWS.SNOOZED_CASES.TITLE]: currentlySnoozed
        }
      });
    } catch (e) {
      console.error(e.message);
    }
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

      return snoozeData;
    } catch (e) {
      console.error(e.message);
      this.notify(e.message, "error");
    }
  };

  createSnooze = async (rowData, snoozeOption) => {
    try {
      await this.snooze(rowData, snoozeOption);
      this.setState({
        active_cases: this.state.active_cases.filter(
          c => c.receiptNumber !== rowData.receiptNumber
        )
      });
    } catch (e) {
      console.error(e.message);
      this.notify(e.message, "error");
    }
  };

  reSnooze = async (rowData, snoozeOption) => {
    try {
      const snoozeData = await this.snooze(rowData, snoozeOption);
      const snoozedCases = this.state.snoozed_cases
        .map(snoozedCase => {
          if (snoozedCase.receiptNumber === rowData.receiptNumber) {
            return { ...snoozedCase, snoozeInformation: snoozeData };
          }

          return snoozedCase;
        })
        .sort((a, b) => {
          return (
            new Date(a.snoozeInformation.snoozeEnd) -
            new Date(a.snoozeInformation.snoozeStart) -
            (new Date(b.snoozeInformation.snoozeEnd) -
              new Date(b.snoozeInformation.snoozeStart))
          );
        });

      if (
        snoozedCases[snoozedCases.length - 1].receiptNumber ===
          rowData.receiptNumber &&
        snoozedCases.length < this.state.summary[VIEWS.SNOOZED_CASES.TITLE]
      ) {
        snoozedCases.pop();
      }

      this.setState({ snoozed_cases: snoozedCases });
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
      snooze: this.createSnooze,
      details: this.detailView.bind(this),
      closeDialog: this.closeDialog.bind(this),
      snoozeUpdate: this.detailView.bind(this),
      deSnooze: this.deSnooze,
      reSnooze: this.reSnooze
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
          <div class="grid-container">
            <FormattedDate 
              label="Last Refresh"
              date={this.state.dataRefresh}
            />
            {this.state.alerts.map(alert => (
              <UsaAlert
                alertType={alert.alertType}
                content={alert.content}
                onClick={() => this.dismissAlert(alert)}
              />
            ))}
            <Route
              path="/"
              exact={true}
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
          </div>
        </main>
      </div>
    );
  }
}

export default App;
