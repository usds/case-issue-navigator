import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import UsaSelect from './UsaSelect';

export default function SnoozeInputs(props) {
    console.log(props);
    let follow_up_fragment = null;
    if (props.selectedOption && props.selectedOption.follow_up !== undefined) {
        follow_up_fragment = (
            <div>
                <label className="usa-label" htmlFor="snooze-follow-up">{props.selectedOption.follow_up}</label>
                <input onChange={props.onChange}
                    className="usa-input"
                    id="snooze-follow-up"
                    name="snooze-follow-up"
                    type="text"
                    defaultValue={props.followUp}
                />
            </div>
        );
    }
    const selectedValue = props.selectedOption && props.selectedOption.value;
    console.log("Selected value is ", selectedValue);
    return (
        <Fragment>
            <UsaSelect
                label="Reason to snooze this case:"
                onChange={props.onChange}
                options={props.options}
                placeholder="- Select Reason -"
                name="snooze-reason"
                selected={selectedValue}
            />
            {follow_up_fragment}
        </Fragment>
    );
}

SnoozeInputs.propTypes = {
    followUp: PropTypes.string
}