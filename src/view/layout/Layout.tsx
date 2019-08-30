import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import PrimaryNavMenu from "../PrimaryNavMenu";
import { VIEWS } from "../../controller/config";
import FormattedDate from "../util/FormattedDate";
import caseFetcher from "../../model/caseFetcher";
import "react-toastify/dist/ReactToastify.css";
import { Summary } from "../../types";

type Notification = {
  message: string;
  type: "info" | "success" | "warning" | "error" | "default" | undefined;
};

interface LayoutProps {
  render: (
    toggleUpdateSummary: () => void,
    setNotification: React.Dispatch<React.SetStateAction<Notification>>,
    summary: Summary
  ) => React.Component;
}

const Layout: React.FunctionComponent<LayoutProps> = props => {
  const [summary, setSummary] = useState<Summary>({
    CASES_TO_WORK: 0,
    SNOOZED_CASES: 0
  });

  const [notification, setNotification] = useState<Notification>({
    message: "",
    type: undefined
  });

  const [updateSummary, setUpdateSummary] = useState<boolean>(false);

  const shouldUpdateSummary = () => {
    setUpdateSummary(true);
  };

  useEffect(() => {
    if (notification.message) {
      toast(notification.message, { type: notification.type });
    }
  }, [notification]);

  useEffect(() => {
    if (!shouldUpdateSummary) {
      return;
    }

    let canceled = false;
    const updateSummaryData = async () => {
      try {
        const summary = await caseFetcher.getCaseSummary();

        const currentlySnoozed = summary.CURRENTLY_SNOOZED || 0;
        const neverSnoozed = summary.NEVER_SNOOZED || 0;
        const previouslySnoozed = summary.PREVIOUSLY_SNOOZED || 0;

        if (!canceled) {
          setSummary({
            CASES_TO_WORK: neverSnoozed + previouslySnoozed,
            SNOOZED_CASES: currentlySnoozed
          });
        }
        setUpdateSummary(false);
      } catch (e) {
        console.error(e.message);
      }
      return () => (canceled = true);
    };
    updateSummaryData();
  }, [updateSummary]);

  return (
    <div className="case-issue-navigator">
      <ToastContainer />
      <PrimaryNavMenu
        title="Case Issue Navigator"
        views={VIEWS}
        summary={summary}
      />
      <main id="main-content">
        <FormattedDate label="Last Refresh" date={new Date()} />
        {props.render(shouldUpdateSummary, setNotification, summary)}
      </main>
    </div>
  );
};

export { Layout };
