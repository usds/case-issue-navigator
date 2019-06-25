import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

export default function UsaSelect(props) {
    const selectId = props.id || props.name;
    // this might be better as props.children
    const label = props.label && <label className="usa-label" htmlFor={selectId}>{props.label}</label>
    const placeholder = props.placeholder && <option value={false} disabled={true}  hidden={true}>{props.placeholder}</option>

    return (
        <Fragment>
            <select defaultValue={false} 
                onChange={props.onChange}
                required={true}
                className="usa-select"
                name={props.name}
                id={selectId}>
            {placeholder}
            {
                props.options.map(opt=><option key={opt.value} value={opt.value}>{opt.text}</option>)
            }
            </select>
        </Fragment>
    );
}

UsaSelect.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
};
