import React from "react";
import "./Card.scss";

interface Props {
  header?: string;
}

const Card: React.FunctionComponent<Props> = props => (
  <div className="card">
    {props.header ? <div className="card-header">{props.header}</div> : null}
    <div className="card-body">{props.children}</div>
  </div>
);

export { Card };
