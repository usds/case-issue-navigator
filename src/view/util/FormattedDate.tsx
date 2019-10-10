import React from "react";

interface Props {
    label: string;
    date?: Date;
}

const FormattedDate: React.FC<Props> = props => {

    if (!props.date) {
        return null;
    }
    return (
        <p>{props.label}: {props.date.toLocaleString()}</p>
    );
};

export default FormattedDate;
