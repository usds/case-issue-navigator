import React, {Component} from 'react';

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
      this.props.callback.snooze(this.props.rowData, 15);
      this.props.callback.closeDialog();
    }

    render() {
      let buttonText = "Select a Reason";
      if (this.state._enabled) {
        const duration = {
          test_data: 'one year',
          assigned_case: 'five days',
          in_proceedings: 'one month'
        };
        buttonText = "Snooze for " + duration[this.state['snooze-reason']];
      }
      return (
        <form className="usa-form">
          <input id="how" className="usa-checkbox__input" type="checkbox" name="checkybox" value="not" />
          <label className="usa-checkbox__label" htmlFor="how">This is not how you do it</label>
          <label className  ="usa-label" htmlFor="snooze-reason">Reason to snooze this case:</label>
          <select defaultValue={false} onChange={this.formChange.bind(this)} required={true} className="usa-select" name="snooze-reason" id="snooze-reason">
            <option value={false} disabled={true}  hidden={true}>- Select Reason -</option>
            <option value="test_data">Test Data</option>
            <option value="assigned_case">Case has been assigned</option>
            <option value="in_proceedings">Case is pending removal proceedings</option>
          </select>
          <button
              onClick={this.formSubmit.bind(this)}
              className={"usa-button" + (this.state._enabled ? "" : " usa-button--disabled")}>
            {buttonText}
          </button>
        </form>
      );
    }
}

export default SnoozeForm;
