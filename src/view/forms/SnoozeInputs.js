import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import UsaSelect from './UsaSelect';
import UsaTextInput from './UsaTextInput';

export default function SnoozeInputs(props) {
    let follow_up_fragment = null;
    if (props.selectedOption && props.selectedOption.follow_up !== undefined) {
        follow_up_fragment = (
        <UsaTextInput
            name="snooze-follow-up"
            onChange={props.onChange}
            defaultValue={props.followUp}
        >
            {props.selectedOption.follow_up}
        </UsaTextInput>
        );
    }
    const selectedValue = props.selectedOption && props.selectedOption.value;
    return (
        <Fragment>
            <UsaSelect
                onChange={props.onChange}
                options={props.options}
                placeholder="- Select Reason -"
                name="snooze-reason"
                selected={selectedValue}
            >
                Reason to snooze this case:
            </UsaSelect>
            {follow_up_fragment}
        </Fragment>
    );
}

SnoozeInputs.propTypes = {
    followUp: PropTypes.string
}