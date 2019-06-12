import React, {Component} from 'react';
import 'uswds';
import './App.css';
import ReceiptList from './view/ReceiptList';
import CaseDetail from './view/CaseDetail';
import fetchAll from "./model/FakeCaseFetcher";

class App extends Component {
    constructor(props) {
      super(props);
      this.state= {cases: fetchAll()};
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

      return <div className="stuck-case-navigator">{content}</div>;
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
