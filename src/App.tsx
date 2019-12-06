import React from "react";
import { Route } from "react-router-dom";
import "uswds";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import CaseList from "./view/CaseList";
import { VIEWS } from "./controller/config";
import Header from "./view/layout/Header";
import AuthContainer from "./view/auth/AuthContainer";

library.add(fas);

const ActiveCaseList: React.FC<{}> = () => <CaseList snoozeState={"ACTIVE"} />;
const SnoozedCaseList: React.FC<{}> = () => (
  <CaseList snoozeState={"SNOOZED"} />
);

const App: React.FC = () => {
  const snoozePath = `/${VIEWS.SNOOZED_CASES.ROUTE}`;
  return (
    <div className="case-issue-navigator">
      <AuthContainer>
        <Header />
        <main id="main-content">
          <Route path="/" exact={true} component={ActiveCaseList} />
          <Route path={snoozePath} component={SnoozedCaseList} />
        </main>
      </AuthContainer>
    </div>
  );
};

export default App;
