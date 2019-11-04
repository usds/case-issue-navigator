import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import PrimaryNavMenu from "./PrimaryNavMenu";
import { VIEWS } from "../../controller/config";
import "react-toastify/dist/ReactToastify.css";
import ErrorHandler from "./ErrorHandler";
import { RootState } from "../../redux/create";
import { connect } from "react-redux";

const mapStateToProps = (state: RootState) => ({
  notification: state.appStatus.notification
});

type LayoutProps = ReturnType<typeof mapStateToProps>;

const UnconnnectedLayout: React.FunctionComponent<LayoutProps> = props => {
  const { notification } = props;

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
      <ToastContainer />
      <ErrorHandler />
      <PrimaryNavMenu views={VIEWS} />
    </React.Fragment>
  );
};

export default connect(mapStateToProps)(UnconnnectedLayout);
