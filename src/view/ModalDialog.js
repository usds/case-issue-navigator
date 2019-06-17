import React, {Component} from 'react';


// Hacky McHackface
function uswds_image(img_name) {
    return require('../../node_modules/uswds/dist/img/' + img_name);
}

class ModalDialog extends Component {
    constructor(props) {
        super(props);
        this.keyHandler = this.escFunction.bind(this);
    }
    render() {
        if (!this.props.show) {
            return null;
        }
        return(
            <div id="case-modal">
            <div className="usa-overlay-copy"/>
            <div className="modal-dialog usa-grid tablet:grid-col-4 tablet:grid-offset-4 z-top bg-white border-primary border border-width-05 padding-2 radius-sm">
                <h3>{this.props.modalTitle}
                    <img
                        src={uswds_image("close.svg")}
                        align="right"
                        onClick={this.props.callback.closeDialog}
                        alt="close" />
                </h3>
            {this.props.modalContent}
            </div>
            </div>
        );
    }

    escFunction(event){
        if(event.keyCode === 27) {
          this.props.callback.closeDialog(event);
        }
    }

    componentDidMount(){
        this.toggleScrollLock({});
    }

    componentDidUpdate(prevProps) { // prevState, snapshot
        this.toggleScrollLock(prevProps)
    }

    toggleScrollLock(prevProps) {
        if (this.props.show === prevProps.show) {
            return;
        }
        if (this.props.show) {
            document.body.classList.add("overflow-y-hidden")
            document.addEventListener("keydown", this.keyHandler, false);
        } else {
            document.body.classList.remove("overflow-y-hidden")
            document.removeEventListener("keydown", this.keyHandler, false);
        }

    }
}
export default ModalDialog;