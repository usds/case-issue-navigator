import React, { useState, useEffect } from "react";
import { AuthForm } from "./AuthForm";
import { API_BASE_URL } from "../../controller/config";
import RestAPIClient from "../../model/RestAPIClient";

type AuthContext = {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<boolean>;
  name: string;
};

interface AuthContainerProps {
  defaultLoggedInState: boolean;
}

export const AuthContext = React.createContext({} as AuthContext);

const AuthContainer: React.FC<AuthContainerProps> = props => {
  const [loggedIn, setLoggedIn] = useState<boolean>(props.defaultLoggedInState);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (!loggedIn) {
      return setName("");
    }

    const getUser = async () => {
      try {
        const response = await RestAPIClient.auth.getCurrentUser();
        if (response.succeeded) {
          setName(response.payload.name);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
  }, [loggedIn]);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, name }}>
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
