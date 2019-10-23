import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import PrimaryNavMenu from "./PrimaryNavMenu";
import { VIEWS } from "../../controller/config";
import FormattedDate from "../util/FormattedDate";
import "react-toastify/dist/ReactToastify.css";
import RestAPIClient from "../../api/RestAPIClient";
import { ErrorHandler } from "./ErrorHandler";

interface LayoutProps {
  render: (
    toggleUpdateSummary: () => void,
    setError: React.Dispatch<APIError>,
    setNotification: React.Dispatch<React.SetStateAction<AppNotification>>,
    summary: Summary
  ) => JSX.Element;
}

const Layout: React.FunctionComponent<LayoutProps> = props => {
  const [summary, setSummary] = useState<Summary>({
    CASES_TO_WORK: 0,
    SNOOZED_CASES: 0,
    PREVIOUSLY_SNOOZED: 0
  });
  const [lastUpdated, setLastUpdated] = useState<string | null>();
  const [error, setError] = useState<APIError>({} as APIError);
  const [notification, setNotification] = useState<AppNotification>(null);
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
        setLastUpdated(response.payload.lastUpdated);
        return setUpdateSummary(false);
      }
      if (response.responseReceived) {
        const errorJson = await response.responseError.getJson();
        setError(errorJson as APIError);
      } else {
        console.error(response);
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
        <FormattedDate label="Last Refresh" date={lastUpdated} />
        {props.render(shouldUpdateSummary, setError, setNotification, summary)}
      </main>
    </div>
  );
};

export { Layout };
