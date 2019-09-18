import React from "react";
import "./AuthForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

interface AuthFormProps {
  loginUrl: string;
}

const AuthForm: React.FC<AuthFormProps> = props => {
  return (
    <div className="overlay">
      <div className="item">
        <p>To use the Search Party tool, you must be logged in to USCIS.</p>
        <p>
          <a href={props.loginUrl} className="usa-button usa-button--primary">
            <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>&nbsp; Log In
            to USCIS
          </a>
        </p>
      </div>
    </div>
  );
};

export { AuthForm };
