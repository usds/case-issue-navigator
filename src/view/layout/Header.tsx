import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import PrimaryNavMenu from "./PrimaryNavMenu";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../../redux/create";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { trackPageView, setDocumentTitle } from "../../matomo-setup";

const mapStateToProps = (state: RootState) => ({
  notification: state.appStatus.notification,
  pageTitle: state.appStatus.pageTitle
});

type Props = ReturnType<typeof mapStateToProps>;

const UnconnnectedHeader: React.FunctionComponent<Props> = props => {
  const { notification, pageTitle } = props;

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
      <div>
        <p>Aging I-90 cases excluding BCU and FDNS referrals.</p>
      </div>
    </React.Fragment>
  );
};

export default connect(mapStateToProps)(UnconnnectedHeader);
