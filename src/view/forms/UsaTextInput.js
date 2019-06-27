import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

export default function UsaTextInput(props) {
    const elementId = props.id || props.name;
    const label = props.children && (<label className="usa-label" htmlFor={elementId}>
        {props.children}
    </label>);
    return (
        <Fragment>
            {label}
            <input onChange={props.onChange}
                className="usa-input"
                type="text"
                id={elementId}
                name={props.name}
                defaultValue={props.defaultValue}
            />
        </Fragment>
    );
}

UsaTextInput.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};
