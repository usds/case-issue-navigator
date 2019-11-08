import React, { useEffect } from "react";
import { AuthForm } from "./AuthForm";
import { API_BASE_URL } from "../../controller/config";
import RestAPIClient from "../../api/RestAPIClient";
import { RootState } from "../../redux/create";
import { Dispatch, AnyAction, bindActionCreators } from "redux";
import { appStatusActionCreators } from "../../redux/modules/appStatus";
import { connect } from "react-redux";
import { LoadingPage } from "../layout/Loading";

const mapStateToProps = (state: RootState) => ({
  user: state.appStatus.user,
  isInitializing: state.appStatus.isInitializing
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      setUser: appStatusActionCreators.setUser,
      setIsInitializing: appStatusActionCreators.setIsInitializing
    },
    dispatch
  );

type AuthContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const UnconnectedAuthContainer: React.FC<AuthContainerProps> = ({
  children,
  user,
  setUser,
  isInitializing,
  setIsInitializing
}) => {
  useEffect(() => {
    if (user) {
      return;
    }

    // Get csrf from server before it's needed
    RestAPIClient.cases.getCsrf();

    const getUser = async () => {
      try {
        const response = await RestAPIClient.auth.getCurrentUser();
        if (response.succeeded) {
          setUser(response.payload.name);
        }
        setIsInitializing(false);
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
  }, [user, setUser]);

  if (isInitializing) {
    return <LoadingPage />;
  }

  return user ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <AuthForm
      loginUrl={`${API_BASE_URL}/clientLogin/?redirect=${window.location}`}
    />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedAuthContainer);
