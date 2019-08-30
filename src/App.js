import React from "react";
import { Route } from "react-router-dom";
import "uswds";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { ActiveCaseList } from "./view/caselists/ActiveCaseList";
import { SnoozedCaseList } from "./view/caselists/SnoozedCaseList";
import { VIEWS } from "./controller/config";
import { Layout } from "./view/layout/Layout";

library.add(fas);

const App = () => (
  <Layout
    render={(updateSummaryData, setNotification, summary) => (
      <React.Fragment>
        <Route
          path="/"
          exact={true}
          render={() => (
            <ActiveCaseList
              updateSummaryData={updateSummaryData}
              setNotification={setNotification}
            />
          )}
        />
        <Route
          path={`/${VIEWS.SNOOZED_CASES.ROUTE}`}
          render={() => (
            <SnoozedCaseList
              updateSummaryData={updateSummaryData}
              setNotification={setNotification}
              summary={summary}
            />
          )}
        />
      </React.Fragment>
    )}
  />
);

export default App;
