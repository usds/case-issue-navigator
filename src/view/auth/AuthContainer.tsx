import React, { useState } from "react";
import { AuthForm } from "./AuthForm";

type AuthContext = {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<boolean>;
};

export const AuthContext = React.createContext({} as AuthContext);

const AuthContainer: React.FC = props => {
  const [loggedIn, setLoggedIn] = useState<boolean>(true);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {loggedIn ? props.children : <AuthForm />}
    </AuthContext.Provider>
  );
};

export { AuthContainer };
