import React, { useState } from "react";
import { Route } from "react-router-dom";
import "uswds";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { ActiveCaseList } from "./view/caselists/ActiveCaseList";
import { SnoozedCaseList } from "./view/caselists/SnoozedCaseList";
import { VIEWS } from "./controller/config";
import { Layout } from "./view/layout/Layout";
import { AuthContainer } from "./view/auth/AuthContainer";
import { Helmet } from "react-helmet";
import { trackPageView, setDocumentTitle } from "./matomo-setup";

library.add(fas);

const App = () => {
  const [title, setTitle] = useState("Case Issue Navigator");

  const setPageTitle = pageTitle => {
    setTitle(`${pageTitle} | Case Issue Navigator`);
  };

  return (
    <AuthContainer defaultLoggedInState={true}>
      <Helmet
        onChangeClientState={({ title }) => {
          setDocumentTitle(title);
          trackPageView();
        }}
      >
        <title>{title}</title>
      </Helmet>
      <Layout
        render={(updateSummaryData, setError, setNotification, summary) => (
          <React.Fragment>
            <Route
              path="/"
              exact={true}
              render={() => {
                setPageTitle(VIEWS.CASES_TO_WORK.TITLE);
                return (
                  <ActiveCaseList
                    updateSummaryData={updateSummaryData}
                    setNotification={setNotification}
                    summary={summary}
                    setError={setError}
                  />
                );
              }}
            />
            <Route
              path={`/${VIEWS.SNOOZED_CASES.ROUTE}`}
              render={() => {
                setPageTitle(VIEWS.SNOOZED_CASES.TITLE);
                return (
                  <SnoozedCaseList
                    updateSummaryData={updateSummaryData}
                    setNotification={setNotification}
                    summary={summary}
                    setError={setError}
                  />
                );
              }}
            />
          </React.Fragment>
        )}
      />
    </AuthContainer>
  );
};

export default App;
