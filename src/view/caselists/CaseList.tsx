import React, { useState, SetStateAction, Dispatch } from "react";
import UsaButton from "../util/UsaButton";
import ReceiptList from "../tables/ReceiptList";

interface CaseListProps {
  isLoading: boolean;
  headers: Array<Header>;
  callbacks: Callbacks;
  cases: Array<Case>;
  loadMoreCases: () => void;
  openModal: (rowData: Case, receiptNumber: string) => void;
  closeModal: () => void;
  totalCases: number;
}

const CaseList: React.FunctionComponent<CaseListProps> = props => {
  const callbacks = {
    ...props.callbacks,
    details: props.openModal,
    closeDialog: props.closeModal
  };

  const { cases, totalCases } = props;

  return (
    <React.Fragment>
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
