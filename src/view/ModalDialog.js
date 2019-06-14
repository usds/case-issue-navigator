import React from 'react';


// Hacky McHackface
function uswds_image(img_name) {
    return require('../../node_modules/uswds/dist/img/' + img_name);
}

export default function ModalDialog(props) {
    if (!props.show) {
        return null;
    }
    return(
        <div id="case-modal">
        <div className="usa-overlay-copy"/>
        <div className="modal-dialog usa-grid grid-col-4 grid-offset-4 z-top bg-white border-primary border border-width-05 padding-2 radius-sm">
            <h3>{props.modalTitle}<button id="modal-close" onClick={props.callback.closeDialog}><img src={uswds_image("close.svg")} alt="close" /></button>
</h3>
          {props.modalContent}
        </div>
      </div>
    )
}
