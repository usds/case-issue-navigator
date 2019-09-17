import React, { useState } from "react";
import { AuthForm } from "./AuthForm";
import { API_BASE_URL } from "../../controller/config";

type AuthContext = {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<boolean>;
};

interface AuthContainerProps {
  defaultLoggedInState: boolean;
}

export const AuthContext = React.createContext({} as AuthContext);

const AuthContainer: React.FC<AuthContainerProps> = props => {
  const [loggedIn, setLoggedIn] = useState<boolean>(props.defaultLoggedInState);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {loggedIn ? (
        props.children
      ) : (
        <AuthForm
          loginUrl={`${API_BASE_URL}/clientLogin/?redirect=${window.location}`}
        />
      )}
    </AuthContext.Provider>
  );
};

export { AuthContainer };
