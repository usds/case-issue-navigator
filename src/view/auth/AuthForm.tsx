import React from "react";
import "./AuthForm.css";
import { API_BASE_URL } from "../../controller/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const AuthForm: React.FC = () => {
  return (
    <div className="overlay">
      <div className="item">
        <p>To use the Search Party tool, you must be logged in to USCIS.</p>
        <p>
          <a
            href={`${API_BASE_URL}/clientLogin/?redirect=${window.location}`}
            className="usa-button usa-button--primary "
          >
            <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>&nbsp; Log In
            to USCIS
          </a>
        </p>
      </div>
    </div>
  );
};

export { AuthForm };
