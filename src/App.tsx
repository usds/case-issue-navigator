import React from "react";
import { Route } from "react-router-dom";
import "uswds";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import ActiveCaseList from "./view/caselists/ActiveCaseList";
import { SnoozedCaseList } from "./view/caselists/SnoozedCaseList";
import { VIEWS } from "./controller/config";
import { Layout } from "./view/layout/Layout";
import { AuthContainer } from "./view/auth/AuthContainer";
import { Helmet } from "react-helmet";
import { trackPageView, setDocumentTitle } from "./matomo-setup";
import { RootState } from "./redux/create";
import { Dispatch, bindActionCreators, AnyAction } from "redux";
import { appStatusActionCreators } from "./redux/modules/appStatus";
import { connect } from "react-redux";

library.add(fas);

const mapStateToProps = (state: RootState) => ({
  pageTitle: state.appStatus.pageTitle
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      setPageTitle: appStatusActionCreators.setPageTitle
    },
    dispatch
  );

type AppProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export const UnconnectedApp: React.FC<AppProps> = ({
  setPageTitle,
  pageTitle
}) => {
  const setSubtitle = (subtitle: string) => {
    const newPageTitle = `${subtitle} | Case Issue Navigator`;
    if (newPageTitle !== pageTitle) {
      setPageTitle(newPageTitle);
    }
  };

  return (
    <AuthContainer defaultLoggedInState={true}>
      <Helmet
        onChangeClientState={({ title }) => {
          setDocumentTitle(title);
          trackPageView();
        }}
      >
        <title>{pageTitle}</title>
      </Helmet>
      <Layout
        render={(updateSummaryData, setError, setNotification, summary) => (
          <React.Fragment>
            <Route
              path="/"
              exact={true}
              render={() => {
                setSubtitle(VIEWS.CASES_TO_WORK.TITLE);
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
                setSubtitle(VIEWS.SNOOZED_CASES.TITLE);
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedApp);
