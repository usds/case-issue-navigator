import React, { useState, SetStateAction, Dispatch } from "react";
import { ActionModal } from "../util/ActionModal";
import UsaButton from "../util/UsaButton";
import ReceiptList from "../tables/ReceiptList";
import { Callbacks, Header, Case } from "../../types";

interface CaseListProps {
  isLoading: boolean;
  headers: Array<Header>;
  callbacks: Callbacks;
  cases: Array<Case>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  ModalContent: React.JSXElementConstructor<{
    callback: Callbacks;
    rowData: Case | {};
  }>;
}

const CaseList: React.FunctionComponent<CaseListProps> = props => {
  const [dialog, setDialog] = useState({
    show: false,
    title: ""
  });

  const [clickedRow, setClickedRow] = useState({ receiptNumber: "" });

  const openModal = (rowData: Case) => {
    setClickedRow(rowData);
    setDialog({ show: true, title: clickedRow.receiptNumber });
  };

  const closeModal = () => setDialog({ show: false, title: "" });

  const callbacks = {
    ...props.callbacks,
    details: openModal,
    closeDialog: closeModal
  };

  const { currentPage, ModalContent, setCurrentPage } = props;

  return (
    <React.Fragment>
      <ActionModal
        isOpen={dialog.show}
        title={dialog.title}
        closeModal={closeModal}
      >
        <ModalContent callback={callbacks} rowData={clickedRow} />
      </ActionModal>
      <ReceiptList
        cases={props.cases}
        callback={callbacks}
        isLoading={props.isLoading}
        headers={props.headers}
      />
      <UsaButton
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={props.isLoading}
      >
        {props.isLoading ? "Loading..." : "Load More Cases"}
      </UsaButton>
    </React.Fragment>
  );
};

export { CaseList };
