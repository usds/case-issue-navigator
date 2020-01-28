import React from "react";
import "./FormattedDate.scss";

interface Props {
  label: string;
  date?: string | null;
}

const FormattedDate: React.FC<Props> = props => {
  if (!props.date) {
    return null;
  }

  if (Number.isNaN(Date.parse(props.date))) {
    console.error(`Invalid date: ${props.date}`);
    return null;
  }

  return (
    <span className="formatted-date">
      {props.label}: {new Date(props.date).toLocaleString()}
    </span>
  );
};

export default FormattedDate;
