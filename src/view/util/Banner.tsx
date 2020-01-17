import React from "react";
import "./Banner.scss";

const Banner: React.FunctionComponent<{}> = props => {
  return (
    <div className="banner">
      {props.children}
    </div>
  );
};

export { Banner };
