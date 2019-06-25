import React, {Component} from 'react';
import formConfig from "./config";
import UsaSelect from "../view/forms/UsaSelect";

class SnoozeForm extends Component {

    constructor(props) {
      super(props);
      this.state = {};
    }

    formChange(e) {
      const stateSetter = {};
      stateSetter[e.target.name] = e.target.value;
      if (e.target.name === "snooze-reason") {
        stateSetter._enabled = true;
      }
      this.setState(stateSetter);
    }

    formSubmit(e) {
      e.preventDefault(); // nobody wants an actual form submission
      this.props.callback.snooze(this.props.rowData, this.getSelectedOption(), this.state["snooze-follow-up"]);
      this.props.callback.closeDialog();
    }

    getSelectedOption() {
        return formConfig.snooze_options.find(opt=>opt.value === this.state['snooze-reason']);
    }

    snoozeDaysRequested() {
        return this.getSelectedOption().snooze_days;
    }
    deSnoozeCheck() {
        if(this.props.rowData.desnoozed) {
            const now = new Date(); // cheating!

            return (
                <div className="usa-alert usa-alert--warning usa-alert--slim">
                    <div className="usa-alert__body">
                        <p className="usa-alert__text">
                            Case was previously snoozed
                            on {now.getMonth()+1}/{now.getDate()}/{now.getFullYear()}.
                            Reason given: {this.props.rowData.snooze_option.short_text}.
                        </p>
                    </div>
                </div>
            );
        }
    }
    render() {
      let buttonText = "Select a Reason";
      let selectedOption = {};
      if (this.state._enabled) {
        selectedOption = this.getSelectedOption();
        const snooze_days = selectedOption.snooze_days;
        buttonText = "Snooze for " + snooze_days + " day" + (snooze_days === 1 ? "" : "s");
      }
      return (
        <form className="usa-form">
          {this.deSnoozeCheck()}
          <UsaSelect label="Reason to snooze this case:"
            onChange={this.formChange.bind(this)}
            options={formConfig.snooze_options}
            placeholder="- Select Reason -"
            name="snooze-reason"
          />
          {_follow_up_entry(selectedOption, this.formChange.bind(this))}
          <button
              onClick={this.formSubmit.bind(this)}
              className={"usa-button" + (this.state._enabled ? "" : " usa-button--disabled")}>
            {buttonText}
          </button>
        </form>
      );
    }
}

function _follow_up_entry(option, callback) {
    if (option.follow_up === undefined) {
        return null;
    }
    return (
        <div>
            <label className="usa-label" htmlFor="snooze-follow-up">{option.follow_up}</label>
            <input onChange={callback} className="usa-input" id="snooze-follow-up" name="snooze-follow-up" type="text"></input>
        </div>
    );
}

export default SnoozeForm;
