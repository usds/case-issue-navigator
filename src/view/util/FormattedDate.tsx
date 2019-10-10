import React from "react";

interface Props {
    label: string;
    date?: string | null;
}

const FormattedDate: React.FC<Props> = props => {
    if (!props.date) {
        return null;
    }

    const date = new Date(props.date);

    if (date.toString() === "Invalid Date") {
        console.error(`Invalid date: {date}`);
    }

    return (
        <p>{props.label}: {date.toLocaleString()}</p>
    );
};

export default FormattedDate;
