import React, { useState, useEffect } from "react";
import {
  ToastContainer,
  toast,
  ToastContent,
  ToastOptions
} from "react-toastify";
import PrimaryNavMenu from "../PrimaryNavMenu";
import { VIEWS } from "../../controller/config";
import FormattedDate from "../util/FormattedDate";
import caseFetcher from "../../model/caseFetcher";
import "react-toastify/dist/ReactToastify.css";

interface LayoutProps {
  render: (
    updateSummaryData: Function,
    notify: Function,
    summary: object
  ) => React.Component;
}

const Layout: React.FunctionComponent<LayoutProps> = props => {
  const [summary, setSummary] = useState({
    CASES_TO_WORK: 0,
    SNOOZED_CASES: 0
  });

  const updateSummaryData = async () => {
    try {
      const summary = await caseFetcher.getCaseSummary();

      const currentlySnoozed = summary.CURRENTLY_SNOOZED || 0;
      const neverSnoozed = summary.NEVER_SNOOZED || 0;
      const previouslySnoozed = summary.PREVIOUSLY_SNOOZED || 0;

      setSummary({
        CASES_TO_WORK: neverSnoozed + previouslySnoozed,
        SNOOZED_CASES: currentlySnoozed
      });
    } catch (e) {
      console.error(e.message);
    }
  };

  const notify = (message: ToastContent, type: ToastOptions["type"]): void => {
    toast(message, { type });
  };

  useEffect(() => {
    updateSummaryData();
  }, []);

  return (
    <div className="case-issue-navigator">
      <ToastContainer />
      <PrimaryNavMenu
        title="Case Issue Navigator"
        views={VIEWS}
        summary={summary}
      />
      <main id="main-content">
        <div className="grid-container">
          <FormattedDate label="Last Refresh" date={new Date()} />
        </div>
        {props.render(updateSummaryData, notify, summary)}
      </main>
    </div>
  );
};

export { Layout };
