import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import close from "uswds/dist/img/close.svg";
import UsaButton from "./UsaButton";

const IS_TEST_ENV = process.env.NODE_ENV === "test";

if (!IS_TEST_ENV) {
  Modal.setAppElement("#root");
}

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
    <Modal
      isOpen={props.isOpen}
      style={customStyles}
      ariaHideApp={!IS_TEST_ENV}
    >
      <h3>
        {props.title}
        <div className="float-right">
          <UsaButton
            align="right"
            buttonStyle="unstyled"
            onClick={props.closeModal}
            ariaLabel="close modal"
          >
            <img src={close} alt="close modal" />
          </UsaButton>
        </div>
      </h3>
      {props.children}
    </Modal>
  );
};

ActionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.any
};

export { ActionModal };
