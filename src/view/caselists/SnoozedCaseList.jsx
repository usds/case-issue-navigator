import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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
        headers={props.headers}
      />
      {!props.isLoading && (
        <UsaButton onClick={() => setCurrentPage(currentPage + 1)}>
          Load More Cases
        </UsaButton>
      )}
    </React.Fragment>
  );
};

SnoozedCaseList.propTypes = {
  loadCases: PropTypes.func.isRequired,
  showDialog: PropTypes.bool.isRequired,
  dialogTitle: PropTypes.string,
  callbacks: PropTypes.objectOf(PropTypes.func).isRequired,
  clickedRow: PropTypes.object,
  cases: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool.isRequired,
  headers: PropTypes.arrayOf(PropTypes.object)
};

export { SnoozedCaseList };
