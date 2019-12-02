import React, { useEffect, useRef, useState } from "react";
import TooltipTrigger from "react-popper-tooltip";
import UsaButton from "./UsaButton";
import "./DateRangePicker.scss";

interface Props {
  start: Date;
  end: Date;
  onStartChange: (start: Date) => void;
  onEndChange: (start: Date) => void;
  onSubmit: () => void;
}

const DateRangePicker: React.FunctionComponent<Props> = props => {
  const [show, setShow] = useState(false);

  const togglePopper = () => setShow(!show);
  const hidePopper = () => setShow(false);

  /**
   * Hook that alerts clicks outside of the passed ref
   */
  const useOutsideAlerter = (extrenalTriggerRef: React.MutableRefObject<any>, extrenalPopperRef: React.MutableRefObject<any>) => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event: any) => {
      if (extrenalTriggerRef.current && extrenalPopperRef.current) {
        if (!extrenalTriggerRef.current.contains(event.target) && !extrenalPopperRef.current.contains(event.target)) {
          hidePopper();
        }
      }
    }

    useEffect(() => {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  }
  const extrenalTriggerRef = useRef(null);
  const extrenalPopperRef = useRef(null);
  useOutsideAlerter(extrenalTriggerRef, extrenalPopperRef);

  const lastMonth = () => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth() - 1);
    const end = new Date(today.getFullYear(), today.getMonth());
    end.setDate(end.getDate() - 1);
    props.onStartChange(start);
    props.onEndChange(end);
    hidePopper();
  };

  const thisMonth = () => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth());
    const end = new Date(today.getFullYear(), today.getMonth() + 1);
    end.setDate(end.getDate() - 1);
    props.onStartChange(start);
    props.onEndChange(end);
    hidePopper();
  };

  const Tooltip = ({ tooltipRef, getTooltipProps }: any) => (
    <div
      {...getTooltipProps({
        ref: tooltipRef,
        className: "popper"
      })}
    >
      <div ref={extrenalPopperRef}>
        <div className="caseCreationForm">
          <UsaButton buttonStyle="outline" onClick={lastMonth}>
            Last Month
          </UsaButton>
          <br />
          <UsaButton buttonStyle="outline" onClick={thisMonth}>
            This Month
          </UsaButton>
          <br />
          <UsaButton buttonStyle="outline" onClick={thisMonth}>
            All Cases
          </UsaButton>
        </div>
      </div>
    </div>
  );

  const Trigger = ({ getTriggerProps, triggerRef }: any) => (
    <span {...getTriggerProps({ ref: triggerRef })}>
      <span ref={extrenalTriggerRef}>
        <UsaButton onClick={togglePopper}>
          {props.start.toLocaleDateString()} - {props.end.toLocaleDateString()}
        </UsaButton>
      </span>
    </span>
  );

  return (
    <TooltipTrigger
      placement="bottom"
      trigger="click"
      tooltip={Tooltip}
      tooltipShown={show}
    >
      {Trigger}
    </TooltipTrigger>
  );
};

export { DateRangePicker };
