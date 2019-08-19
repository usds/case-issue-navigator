import React, { Component } from "react";
import { Route } from "react-router-dom";
import "uswds";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import caseFetcher from "./model/caseFetcher";
import { ActiveCaseList } from "./view/caselists/ActiveCaseList";
import { SnoozedCaseList } from "./view/caselists/SnoozedCaseList";
import { VIEWS, I90_HEADERS } from "./controller/config";
import { getHeaders } from "./view/util/getHeaders";
import { toast } from "react-toastify";
import { approximateDays } from "./view/util/approximateDays";
import { Layout } from "./view/layout/Layout";

library.add(fas);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snoozed_cases: [],
      showDialog: false,
      isLoading: false
    };
  }

  notify = (message, type) => {
    if (toast[type]) {
      return toast[type](message);
    }
    toast(message);
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

  clearSnoozedCases = () => this.setState({ snoozed_cases: [] });

  snooze = async (rowData, snoozeOption) => {
    try {
      const snoozeData = await this.updateActiveSnooze(rowData.receiptNumber, {
        duration: snoozeOption.duration,
        reason: snoozeOption.value
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

      return snoozeData;
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

  render() {
    const callbacks = {
      details: this.detailView.bind(this),
      closeDialog: this.closeDialog.bind(this),
      snoozeUpdate: this.detailView.bind(this),
      deSnooze: this.deSnooze,
      reSnooze: this.reSnooze
    };

    return (
      <Layout
        render={(updateSummaryData, notify) => (
          <React.Fragment>
            <Route
              path="/"
              exact={true}
              render={() => (
                <ActiveCaseList
                  updateSummaryData={updateSummaryData}
                  notify={notify}
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
          </React.Fragment>
        )}
      />
    );
  }
}

export default App;
