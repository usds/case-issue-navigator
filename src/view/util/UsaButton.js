import React from 'react';
import PropTypes from 'prop-types';

const BUTTON_TYPES = [
    'secondary',
    'accent-cool',
    'base',
    'outline',
    'inverse',
    'big',
];

export default function UsaButton(props) {
    let buttonClass = "usa-button";
    if (props.buttonStyle !== undefined) {
        buttonClass = buttonClass + " usa-button--" + props.buttonStyle;
    }
    return(
        <button
            className={buttonClass}
            onClick={props.onClick}
            disabled={props.disabled}
            type={props.type}
            >
            {props.children}
        </button>
    );
}

UsaButton.propTypes = {
    buttonStyle: PropTypes.oneOf(BUTTON_TYPES),
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    type: PropTypes.oneOf("button", "submit", "reset"),
};

UsaButton.defaultProps = {
    disabled: false,
    type: "button",
};
