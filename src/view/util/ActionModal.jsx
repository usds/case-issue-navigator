import React from "react";
import Modal from "react-modal";
import close from "uswds/dist/img/close.svg";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const ActionModal = props => {
  return (
    <Modal isOpen={props.isOpen} style={customStyles}>
      <h3>
        {props.title}
        <img src={close} align="right" onClick={props.closeModal} alt="close" />
      </h3>
      {props.children}
    </Modal>
  );
};

export { ActionModal };
