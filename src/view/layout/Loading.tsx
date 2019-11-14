import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Loading.css";

export const LoadingPage: React.FC = () => (
  <div className="loading-page">
    <h1>
      <span>Loading</span>&nbsp;&nbsp;
      <FontAwesomeIcon icon="sync" className="fa-spin" />
    </h1>
  </div>
);
