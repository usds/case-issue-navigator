import React, { useEffect, useContext } from "react";
import { AuthContext } from "../auth/AuthContainer";

interface ErrorHandlerProps {
  setNotification: React.Dispatch<AppNotification>;
  error: APIError;
}

const ErrorHandler: React.FC<ErrorHandlerProps> = props => {
  const { error, setNotification } = props;
  const { setLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (error.status === undefined) {
      return;
    }
    if (error.status === 401) {
      setLoggedIn(false);
    } else if (error.status === 403) {
      setNotification({
        message: "You do not have access to this system.",
        type: "error"
      });
    } else {
      console.error(error);
    }
  }, [error, setNotification, setLoggedIn]);

  return <React.Fragment />;
};

export { ErrorHandler };
