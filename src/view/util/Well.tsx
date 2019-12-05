import React from "react";
import "./Well.scss"

interface Props {
}

const Well: React.FunctionComponent<Props> = props => (
  <div className="well">
    {props.children}
  </div>
);

export { Well };
