import React, { useState } from "react";
import { DateRange, Range } from "react-date-range";
import UsaButton from "../../util/UsaButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const clearedRange = {
  startDate: undefined,
  endDate: undefined
};

export const RangePicker: React.FC = () => {
  const [range, setRange] = useState<Range>(clearedRange);
  const [previousRange, setPreviousRange] = useState<Range>(clearedRange);
  const [open, setOpen] = useState(false);

  const openCalendar = () => {
    if (open) {
      return;
    }
    setOpen(true);
  };

  const clearDates = () => {
    setRange(clearedRange);
    setPreviousRange(clearedRange);
  };

  const formatDateDisplay = (
    date: typeof range.startDate | typeof range.endDate
  ) => {
    if (!date) {
      return "";
    }
    return date.format("ll");
  };

  const output = !range.startDate
    ? "No dates selected"
    : formatDateDisplay(range.startDate) === formatDateDisplay(range.endDate)
    ? formatDateDisplay(range.startDate)
    : `${formatDateDisplay(range.startDate)} - ${formatDateDisplay(
        range.endDate
      )}`;

  return (
    <React.Fragment>
      <label className="usa-label" htmlFor="range-picker">
        Case Creation Date
      </label>
      <div className="position-relative">
        <div>
          <UsaButton
            buttonStyle="unstyled"
            className="margin-top-1 margin-bottom-1"
            onClick={openCalendar}
          >
            <FontAwesomeIcon icon="calendar" /> {output}
          </UsaButton>
          {range.startDate && !open && (
            <UsaButton
              buttonStyle="outline"
              className="margin-left-1"
              onClick={() => {
                window.confirm("Are you sure you want to clear this filter?") &&
                  clearDates();
              }}
            >
              Clear dates
            </UsaButton>
          )}
        </div>
        {open && (
          <div className="float-none display-inline-block outline-1px padding-05 margin-top-1 position-absolute">
            <DateRange
              calendars={2}
              linkedCalendars
              onChange={range => {
                setRange(range);
                if (range.startDate !== range.endDate) {
                  setOpen(false);
                  setPreviousRange(range);
                }
              }}
              ranges={{
                "Some Range": {
                  startDate: "July 10, 2010",
                  endDate: "July 15, 2011"
                }
              }}
            />
            <UsaButton
              className="float-right"
              onClick={() => {
                setOpen(false);
                setRange(previousRange);
              }}
            >
              Cancel
            </UsaButton>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
