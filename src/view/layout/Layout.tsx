import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import PrimaryNavMenu from "./PrimaryNavMenu";
import { VIEWS } from "../../controller/config";
import FormattedDate from "../util/FormattedDate";
import "react-toastify/dist/ReactToastify.css";
import { Summary } from "../../types";
import RestAPIClient from "../../model/RestAPIClient";

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
  const [summary, setSummary] = useState<Summary>({} as Summary);

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

    const updateSummaryData = async () => {
      const response = await RestAPIClient.cases.getCaseSummary();
      if (response.succeeded) {
        const currentlySnoozed = response.payload.CURRENTLY_SNOOZED || 0;
        const neverSnoozed = response.payload.NEVER_SNOOZED || 0;
        const previouslySnoozed = response.payload.PREVIOUSLY_SNOOZED || 0;
        setSummary({
          CASES_TO_WORK: neverSnoozed + previouslySnoozed,
          SNOOZED_CASES: currentlySnoozed,
          PREVIOUSLY_SNOOZED: previouslySnoozed
        });
        return setUpdateSummary(false);
      }
      if (response.responseReceived) {
        const errorJson = await response.responseError.getJson();
        console.error(errorJson);
      }
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
