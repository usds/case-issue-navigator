import React, { useState } from "react";
import { ActionModal } from "../util/ActionModal";
import SnoozeForm from "../../controller/SnoozeForm";
import UsaButton from "../util/UsaButton";
import ReceiptList from "../tables/ReceiptList";

interface CaseListProps {
  isLoading: boolean;
  headers: Array<Object>;
  callbacks: { [x: string]: (...args: any[]) => any };
  cases: Array<Object>;
  clickedRow: object;
  currentPage: number;
  setCurrentPage: Function;
  view: string;
}

const CaseList: React.FunctionComponent<CaseListProps> = props => {
  const [dialog, setDialog] = useState({
    show: false,
    title: ""
  });

  const closeModal = () => setDialog({ show: false, title: "" });

  return (
    <React.Fragment>
      {dialog.show && (
        <ActionModal
          isOpen={dialog.show}
          title={dialog.title}
          closeModal={closeModal}
        >
          <SnoozeForm callback={props.callbacks} rowData={props.clickedRow} />
        </ActionModal>
      )}
      <ReceiptList
        cases={props.cases}
        callback={props.callbacks}
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
