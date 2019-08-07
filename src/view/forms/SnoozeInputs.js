import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

import UsaSelect from "./UsaSelect";
import UsaTextInput from "./UsaTextInput";

export default function SnoozeInputs(props) {
  const inputNames = {
    select: props.prefix + "-reason",
    followUp: props.prefix + "-follow-up"
  };
  const findOption = value => props.options.find(o => value === o.value);
  const [formState, storeValues] = useState({
    selectedOption: props.selectedOption,
    followUp: props.followUp
  });

  const elementChange = e => {
    // this is probably not necessary
    const updatedState = { ...formState };
    const value = e.target.value;
    if (e.target.name === inputNames.followUp) {
      updatedState.followUp = value;
    } else {
      updatedState.selectedOption = findOption(value);
    }
    storeValues(updatedState);
    props.onChange(updatedState);
  };
  let follow_up_fragment = null;
  if (
    formState.selectedOption &&
    formState.selectedOption.followUp !== undefined
  ) {
    follow_up_fragment = (
      <UsaTextInput
        name={inputNames.followUp}
        onChange={elementChange}
        defaultValue={formState.followUp}
      >
        {formState.selectedOption.followUp}
      </UsaTextInput>
    );
  }
  const selectedValue =
    formState.selectedOption && formState.selectedOption.value;
  return (
    <Fragment>
      <UsaSelect
        onChange={elementChange}
        options={props.options.map(opt => ({ ...opt, text: opt.snoozeReason }))}
        placeholder="- Select Reason -"
        name={inputNames.select}
        selected={selectedValue}
      >
        Reason to snooze this case:
      </UsaSelect>
      {follow_up_fragment}
    </Fragment>
  );
}

SnoozeInputs.propTypes = {
  followUp: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  prefix: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  selectedOption: PropTypes.object
};

SnoozeInputs.defaultProps = {
  prefix: "snooze"
};
