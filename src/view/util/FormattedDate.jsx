import React from "react";
import PropTypes from "prop-types";

const FormattedDate = props => {
    if (!props.date) {
        return null;
    } 
    return (
        <p>{props.label}: {props.date.toLocaleString()}</p>
    );
};

FormattedDate.propTypes = {
    label: PropTypes.string.isRequired,
    date: PropTypes.object
};

export default FormattedDate;
