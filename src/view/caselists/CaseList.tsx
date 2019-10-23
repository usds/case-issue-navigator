import React, { useState, SetStateAction, Dispatch } from "react";
import { ActionModal } from "../util/ActionModal";
import UsaButton from "../util/UsaButton";
import ReceiptList from "../tables/ReceiptList";

interface CaseListProps {
  isLoading: boolean;
  headers: Array<Header>;
  callbacks: Callbacks;
  cases: Array<Case>;
  loadMoreCases: () => void;
  ModalContent: React.JSXElementConstructor<{
    callback: Callbacks;
    rowData?: Case;
  }>;
  totalCases: number;
}

const CaseList: React.FunctionComponent<CaseListProps> = props => {
  const [dialog, setDialog] = useState({
    show: false,
    title: ""
  });

  const [clickedRow, setClickedRow] = useState<Case>();

  const openModal = (rowData: Case) => {
    setClickedRow(rowData);
    setDialog({ show: true, title: rowData.receiptNumber });
  };

  const closeModal = () => setDialog({ show: false, title: "" });

  const callbacks = {
    ...props.callbacks,
    details: openModal,
    closeDialog: closeModal
  };

  const { cases, ModalContent, totalCases } = props;

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
        cases={cases}
        callback={callbacks}
        isLoading={props.isLoading}
        headers={props.headers}
      />
      <div className="display-flex flex-column flex-align-center">
        {totalCases > cases.length ? (
          <UsaButton
            onClick={props.loadMoreCases}
            disabled={props.isLoading}
            buttonStyle="outline"
          >
            {props.isLoading ? "Loading..." : "Show More"}
          </UsaButton>
        ) : (
          "There are no more cases on this list."
        )}
      </div>
    </React.Fragment>
  );
};

export { CaseList };
