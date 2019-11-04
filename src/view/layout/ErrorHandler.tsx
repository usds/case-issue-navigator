import React, { useEffect } from "react";
import { RootState } from "../../redux/create";
import { Dispatch, AnyAction, bindActionCreators } from "redux";
import { appStatusActionCreators } from "../../redux/modules/appStatus";
import { connect } from "react-redux";

const mapStateToProps = (state: RootState) => ({
  user: state.appStatus.user,
  error: state.appStatus.dataFetching.error
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      clearUser: appStatusActionCreators.clearUser,
      setNotification: appStatusActionCreators.setNotification
    },
    dispatch
  );

type ErrorHandlerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const UnconnectedErrorHandler: React.FC<ErrorHandlerProps> = ({
  setNotification,
  error,
  clearUser
}) => {
  useEffect(() => {
    if (!error) {
      return;
    }

    if (error.status === undefined) {
      return;
    }
    if (error.status === 401) {
      clearUser();
    } else if (error.status === 403) {
      setNotification({
        message: "You do not have access to this system.",
        type: "error"
      });
    } else {
      console.error(error);
    }
  }, [error, setNotification, clearUser]);

  return <React.Fragment />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedErrorHandler);
