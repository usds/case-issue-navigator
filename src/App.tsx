import React from "react";
import { Route } from "react-router-dom";
import "uswds";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import CaseList from "./view/CaseList";
import Header from "./view/layout/Header";
import AuthContainer from "./view/auth/AuthContainer";

library.add(fas);

const App: React.FC = () => {
  return (
    <div className="case-issue-navigator">
      <AuthContainer>
        <Header />
        <main id="main-content">
          <Route path="/" exact={true} component={CaseList} />
        </main>
      </AuthContainer>
    </div>
  );
};

export default App;
