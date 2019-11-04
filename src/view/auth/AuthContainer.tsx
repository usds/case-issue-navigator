import React, { useEffect } from "react";
import { AuthForm } from "./AuthForm";
import { API_BASE_URL } from "../../controller/config";
import RestAPIClient from "../../api/RestAPIClient";
import { RootState } from "../../redux/create";
import { Dispatch, AnyAction, bindActionCreators } from "redux";
import { appStatusActionCreators } from "../../redux/modules/appStatus";
import { connect } from "react-redux";

const mapStateToProps = (state: RootState) => ({
  user: state.appStatus.user
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      setUser: appStatusActionCreators.setUser
    },
    dispatch
  );

interface AuthContainerProps extends React.Props<any> {
  defaultLoggedInState: boolean;
}

const UnconnectedAuthContainer: React.FC<
  AuthContainerProps &
    ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>
> = ({ children, user, setUser }) => {
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
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
  }, [user, setUser]);

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
