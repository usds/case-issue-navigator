import React from "react";
import PropTypes from "prop-types";
import { TableCell } from "./TableCell";
import { DetailDisplay } from "./DetailDisplay";
import "./ReceiptDisplayRow.scss";

const ReceiptDisplayRow = props => {
  const { data, callback, headers } = props;
  const numberOfColumns = headers.length;
  return (
    <React.Fragment>
      <tr className={data.showDetails ? "row--show-details" : ""}>
        {headers.map((header, i) => (
          <TableCell
            key={`${data.caseId}-${i}`}
            rowData={data}
            header={header}
            callback={callback}
          />
        ))}
      </tr>
      {data.showDetails && (
        <React.Fragment>
          <tr className="row--show-details ">
            <td colSpan={numberOfColumns} className="bg-primary-light">
              <h3>View Details</h3>
            </td>
          </tr>
          {data.notes && data.notes.length > 0 ? (
            data.notes.reverse().map(note => {
              return (
                <tr className="row--show-details">
                  <td colSpan={2}>
                    <strong>
                      {new Date(note.timestamp).toLocaleDateString("en-US")}
                    </strong>
                  </td>
                  <td colSpan={numberOfColumns - 2}>
                    <DetailDisplay note={note} />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="row--show-details">
              <td colSpan={numberOfColumns}>No details available.</td>
            </tr>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

ReceiptDisplayRow.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.object.isRequired,
  callback: PropTypes.objectOf(PropTypes.func).isRequired
};

export default ReceiptDisplayRow;
