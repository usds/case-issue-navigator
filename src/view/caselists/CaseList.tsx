import React, { useState, useEffect } from "react";
import { ActionModal } from "../util/ActionModal";
import UsaButton from "../util/UsaButton";
import ReceiptList from "../tables/ReceiptList";

interface CaseListProps {
  isLoading: boolean;
  headers: Array<Object>;
  callbacks: { [x: string]: (...args: any[]) => any };
  cases: Array<Object>;
  currentPage: number;
  setCurrentPage: Function;
  ModalContent: React.JSXElementConstructor<{
    callback: Object;
    rowData: Object;
  }>;
  view: string;
}

const CaseList: React.FunctionComponent<CaseListProps> = props => {
  const [dialog, setDialog] = useState({
    show: false,
    title: ""
  });

  const [clickedRow, setClickedRow] = useState({ receiptNumber: "" });

  useEffect(() => {
    clickedRow.receiptNumber &&
      setDialog({ show: true, title: clickedRow.receiptNumber });
  }, [clickedRow]);

  const closeModal = () => setDialog({ show: false, title: "" });

  const callbacks = {
    ...props.callbacks,
    details: setClickedRow,
    closeDialog: closeModal
  };

  const { ModalContent } = props;

  return (
    <React.Fragment>
      {dialog.show && (
        <ActionModal
          isOpen={dialog.show}
          title={dialog.title}
          closeModal={closeModal}
        >
          <ModalContent callback={callbacks} rowData={clickedRow} />
        </ActionModal>
      )}
      <ReceiptList
        cases={props.cases}
        callback={callbacks}
        isLoading={props.isLoading}
        headers={props.headers}
      />
      <UsaButton
        onClick={() => props.setCurrentPage(props.currentPage + 1)}
        disabled={props.isLoading}
      >
        {props.isLoading ? "Loading..." : "Load More Cases"}
      </UsaButton>
    </React.Fragment>
  );
};

export { CaseList };
