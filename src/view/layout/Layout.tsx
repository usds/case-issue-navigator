import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import PrimaryNavMenu from "./PrimaryNavMenu";
import { VIEWS } from "../../controller/config";
import FormattedDate from "../util/FormattedDate";
import "react-toastify/dist/ReactToastify.css";
import { Summary } from "../../types";
import RestAPIClient from "../../model/RestAPIClient";
import { ErrorHandler } from "./ErrorHandler";

type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "default"
  | undefined;

export type Notification = {
  message: string;
  type: NotificationType;
  id?: string;
} | null;

type ToastOptions = {
  type: NotificationType;
  toastId?: string;
};

export type Error = {
  error?: string;
  message?: string;
  path?: string;
  status?: number;
  timestamp?: string;
} | null;

interface LayoutProps {
  render: (
    toggleUpdateSummary: () => void,
    setError: React.Dispatch<Error>,
    setNotification: React.Dispatch<React.SetStateAction<Notification>>,
    summary: Summary
  ) => React.Component;
}

const Layout: React.FunctionComponent<LayoutProps> = props => {
  const [summary, setSummary] = useState<Summary>({} as Summary);
  const [error, setError] = useState<Error>(null);
  const [notification, setNotification] = useState<Notification>(null);
  const [updateSummary, setUpdateSummary] = useState<boolean>(false);

  const shouldUpdateSummary = () => {
    setUpdateSummary(true);
  };

  useEffect(() => {
    if (!notification) {
      return;
    }

    if (notification.message) {
      const options: ToastOptions = { type: notification.type };
      toast(notification.message, options);
    }
  }, [notification]);

  useEffect(() => {
    if (!shouldUpdateSummary) {
      return;
    }

    let cancelRequest = false;

    const updateSummaryData = async () => {
      const response = await RestAPIClient.cases.getCaseSummary();
      if (cancelRequest) {
        return;
      }

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
        setError(errorJson);
      } else {
        // Workaround for lack of 401 response
        setError({ status: 401 });
      }
    };
    updateSummaryData();

    return () => {
      cancelRequest = true;
    };
  }, [updateSummary]);

  return (
    <div className="case-issue-navigator">
      <ToastContainer />
      <ErrorHandler setNotification={setNotification} error={error} />
      <PrimaryNavMenu
        title="Case Issue Navigator"
        views={VIEWS}
        summary={summary}
      />
      <main id="main-content">
        <FormattedDate label="Last Refresh" date={new Date()} />
        {props.render(shouldUpdateSummary, setError, setNotification, summary)}
      </main>
    </div>
  );
};

export { Layout };
