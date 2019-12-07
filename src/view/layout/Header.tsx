import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import PrimaryNavMenu from "./PrimaryNavMenu";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../../redux/create";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { trackPageView, setDocumentTitle } from "../../matomo-setup";
import FormattedDate from "../util/FormattedDate";

const mapStateToProps = (state: RootState) => ({
  notification: state.appStatus.notification,
  pageTitle: state.appStatus.pageTitle,
  lastUpdated: state.cases.lastUpdated
});


type Props = ReturnType<typeof mapStateToProps>;

const UnconnnectedHeader: React.FunctionComponent<Props> = props => {
  const {
    notification,
    pageTitle,
    lastUpdated
  } = props;

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
      <PrimaryNavMenu />
      <FormattedDate label="Last Refresh" date={lastUpdated} />
      <p>Excluding cases that have been referred to BCU or FDNS.</p>
    </React.Fragment>
  );
};

export default connect(
  mapStateToProps)(UnconnnectedHeader);
