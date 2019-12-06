import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import PrimaryNavMenu from "./PrimaryNavMenu";
import { VIEWS } from "../../controller/config";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../../redux/create";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { trackPageView, setDocumentTitle } from "../../matomo-setup";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { appStatusActionCreators } from "../../redux/modules/appStatus";
import FormattedDate from "../util/FormattedDate";

const mapStateToProps = (state: RootState) => ({
  notification: state.appStatus.notification,
  caseType: state.cases.type,
  pageTitle: state.appStatus.pageTitle,
  lastUpdated: state.cases.lastUpdated
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      setPageTitle: appStatusActionCreators.setPageTitle
    },
    dispatch
  );

type HeaderProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const UnconnnectedHeader: React.FunctionComponent<HeaderProps> = props => {
  const {
    notification,
    caseType,
    setPageTitle,
    pageTitle,
    lastUpdated
  } = props;

  useEffect(() => {
    const subtitle =
      caseType === "ACTIVE"
        ? VIEWS.CASES_TO_WORK.TITLE
        : VIEWS.SNOOZED_CASES.TITLE;
    setPageTitle(`${subtitle} | Case Issue Navigator`);
  }, [caseType, setPageTitle]);

  useEffect(() => {
    if (!notification) {
      return;
    }

    if (notification.message) {
      const options: ToastOptions = { type: notification.type };
      toast(notification.message, options);
    }
  }, [notification]);

  return (
    <React.Fragment>
      <Helmet
        onChangeClientState={({ title }) => {
          setDocumentTitle(title);
          trackPageView();
        }}
      >
        <title>{pageTitle}</title>
      </Helmet>
      <ToastContainer />
      <PrimaryNavMenu views={VIEWS} />
      <FormattedDate label="Last Refresh" date={lastUpdated} />
      <p>Excluding cases that have been referred to BCU or FDNS.</p>
    </React.Fragment>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnnectedHeader);
