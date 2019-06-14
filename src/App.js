import React, {Component} from 'react';
import 'uswds';
import './App.css';
import ReceiptList from './view/ReceiptList';
import PrimaryNavMenu from './view/PrimaryNavMenu';
import ModalDialog from './view/ModalDialog';
import fetchAll from "./model/FakeCaseFetcher";

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {cases: fetchAll(), activeNavItem: null, showDialog: false, displayMode: "table"};
    }

    render(){
      const callbacks = {
        delete: this.delete.bind(this),
        details: this.detailView.bind(this),
        closeDialog: this.closeDialog.bind(this),
      };
      let content = <ReceiptList cases={this.state.cases} callback={callbacks} mode={this.state.displayMode} />


      return (
        <div className="stuck-case-navigator">
          <div className="usa-overlay"></div>
          <PrimaryNavMenu
            title="Stuck Case Navigator"
            items={["Cases to work", "Snoozed Cases", "Resolved Cases"]}
            active_item={this.state.activeNavItem}
            callback={{navSelect: this.setNav.bind(this)}}
            />
          <main id="main-content">
          <ModalDialog
            show={this.state.showDialog}
            modalTitle={this.state.dialogTitle}
            callback={callbacks}
            modalContent={
              <form className="usa-form">
                <input id="how" className="usa-checkbox__input" type="checkbox" name="checkybox" value="not" />
                <label className="usa-checkbox__label" htmlFor="how">This is not how you do it</label>
              </form>
            }
          />
          {content}
          </main>
        </div>
      );
    }

    setNav(event) {
      this.setState({activeNavItem: event.target.innerText})
    }

    delete(receiptNumber) {
      this.setState(
        {cases: this.state.cases.filter(c => (c.receiptNumber !== receiptNumber))}
      );
    }

    detailView(rowData) {
      this.setState({showDialog: true, dialogTitle: rowData.receiptNumber, clickedRow: rowData});
    }
    closeDialog() {
      this.setState({showDialog: false, clickedRow: null})
    }
}
export default App;
