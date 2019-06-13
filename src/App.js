import React, {Component} from 'react';
import 'uswds';
import './App.css';
import ReceiptList from './view/ReceiptList';
import CaseDetail from './view/CaseDetail';
import PrimaryNavMenu from './view/PrimaryNavMenu';
import fetchAll from "./model/FakeCaseFetcher";

class App extends Component {
    constructor(props) {
      super(props);
      this.state= {cases: fetchAll(), activeNavItem: null};
    }

    render(){
      const callbacks = {
        delete: this.delete.bind(this),
        details: this.detailView.bind(this),
        backToList: this.backToList.bind(this),
      };
      let content;
      if (this.state.caseDetails) {
        content = <CaseDetail caseData={this.state.caseDetails} callback={callbacks}/>
      } else {
        content = <ReceiptList cases={this.state.cases} callback={callbacks} mode="table"/>
      }

      return (
        <div className="stuck-case-navigator">
          <div className="usa-overlay"></div>
          <PrimaryNavMenu
            title="Stuck Case Navigator"
            items={["Cases to work","Snoozed Cases","Dummy entry", "Resolved Cases"]}
            active_item={this.state.activeNavItem}
            callback={{navSelect: this.setNav.bind(this)}}
            />
          <main id="main-content">{content}</main>
        </div>
      );
    }

    setNav(event) {
      event.stopPropagation();
      this.setState({activeNavItem: event.target.innerText})
    }

    delete(receiptNumber) {
      this.setState(
        {cases: this.state.cases.filter(c => (c.receiptNumber !== receiptNumber))}
      );
    }

    detailView(rowData) {
      this.setState({caseDetails: rowData});
    }
    backToList() {
      this.setState({caseDetails: null});
    }
}
export default App;
