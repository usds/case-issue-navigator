import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ActionModal } from "../util/ActionModal";
import SnoozeForm from "../../controller/SnoozeForm";
import ReceiptList from "../tables/ReceiptList";
import UsaButton from "../util/UsaButton";
import { VIEWS } from "../../controller/config";

const ActiveCaseList = props => {
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
          <SnoozeForm callback={props.callbacks} rowData={props.clickedRow} />
        </ActionModal>
      )}
      <ReceiptList
        cases={props.cases}
        callback={props.callbacks}
        view={VIEWS.CASES_TO_WORK.TITLE}
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

ActiveCaseList.propTypes = {
  loadCases: PropTypes.func.isRequired,
  showDialog: PropTypes.bool.isRequired,
  dialogTitle: PropTypes.string,
  callbacks: PropTypes.objectOf(PropTypes.func).isRequired,
  clickedRow: PropTypes.object,
  cases: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool.isRequired,
  headers: PropTypes.arrayOf(PropTypes.object)
};

export { ActiveCaseList };
