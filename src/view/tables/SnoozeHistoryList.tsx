import React from "react";
import { SnoozeEvent } from "../../types";
import "./CaseDetails.scss";
import { SNOOZE_OPTIONS } from "../../controller/config";

interface SnoozeHistoryListProps {
  snoozeEvents: Array<SnoozeEvent>;
}

const SnoozeHistoryList: React.FunctionComponent<
  SnoozeHistoryListProps
> = props => {
  return (
    <React.Fragment>
      <div className="grid-container detail-list">
        <div className="grid-row">
          <h3>Snooze History</h3>
        </div>
        {props.snoozeEvents.length === 0 && (
          <div className="grid-row">No snooze history.</div>
        )}
        {props.snoozeEvents
          .sort(
            (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
          )
          .map(snoozeEvent => {
            const translatedReason = SNOOZE_OPTIONS[snoozeEvent.snoozeReason]
              ? SNOOZE_OPTIONS[snoozeEvent.snoozeReason].snoozeReason
              : snoozeEvent.snoozeReason;

            return (
              <div className="grid-row">
                <div className="grid-col-auto date">
                  {snoozeEvent.date.toLocaleDateString("en-US")}
                </div>
                <div className="grid-col content">
                  {snoozeEvent.startOrEnd === "start"
                    ? `Snooze started for reason "${translatedReason}."`
                    : `Snooze ended for reason "${translatedReason}."`}
                </div>
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
};

export { SnoozeHistoryList };
