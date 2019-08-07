import React, { useState, useEffect } from "react";
import { ActionModal } from "../util/ActionModal";
import DeSnoozeForm from "../../controller/DeSnoozeForm";
import ReceiptList from "../tables/ReceiptList";
import UsaButton from "../util/UsaButton";
import { VIEWS } from "../../controller/config";

const SnoozedCaseList = props => {
  const { loadCases } = props;
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    loadCases(currentPage);
  }, [loadCases, currentPage]);

  return (
    <React.Fragment>
      {props.showDialog && (
        <ActionModal
          isOpen={props.showDialog}
          title={props.dialogTitle}
          closeModal={props.callbacks.closeDialog}
        >
          <DeSnoozeForm callback={props.callbacks} rowData={props.clickedRow} />
        </ActionModal>
      )}
      <ReceiptList
        cases={props.cases}
        callback={props.callbacks}
        view={VIEWS.SNOOZED_CASES.TITLE}
      />
      {!props.isLoading && (
        <UsaButton onClick={() => setCurrentPage(currentPage + 1)}>
          Load More Cases
        </UsaButton>
      )}
    </React.Fragment>
  );
};

export { SnoozedCaseList };
