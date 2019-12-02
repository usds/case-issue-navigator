import React, { useEffect, useRef, useState } from "react";
import TooltipTrigger from "react-popper-tooltip";
import UsaButton from "./UsaButton";
import "./DateRangePicker.scss";

interface Props {
  start?: Date;
  end?: Date;
  lastUpdated?: string;
  caselist: Case[];
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

  const getDefaultStart = () => {
    if (props.caselist.length) {
      return new Date(props.caselist[0].caseCreation);
    }
    return new Date();
  }

  const getStart = () => {
    if (props.start) {
      return props.start;
    }
    return getDefaultStart();
  }

  const getDefaultEnd = () => {
    if (props.lastUpdated) {
      const end = new Date(props.lastUpdated);
      // HACK: This hard codes the fact that the case data currntly include cases older than 1 year
      end.setFullYear(end.getFullYear() - 1);
      return end;
    }
    return new Date();
  }


  const getEnd = () => {
    if (props.end) {
      return props.end;
    }
    return getDefaultEnd();
  }

  const setYear = (year: number) => {
    props.onStartChange(new Date(`01/01/${year}`));
    props.onEndChange(new Date((year + 1).toString()));
    hidePopper();
  };

  const defaultDateRange = () => {
    props.onStartChange(getDefaultStart());
    props.onEndChange(getDefaultEnd());
    hidePopper();
  }

  const Tooltip = ({ tooltipRef, getTooltipProps }: any) => (
    <div
      {...getTooltipProps({
        ref: tooltipRef,
        className: "popper"
      })}
    >
      <div ref={extrenalPopperRef}>
        <div className="caseCreationForm">
          {/* HACK: hard code years for current i90 case list */}
          {[2014, 2015, 2016, 2017, 2018].map((year) => (
            <React.Fragment>
           <UsaButton buttonStyle="outline" onClick={() => setYear(year)}>
              {year}
            </UsaButton>
            <br />
            </React.Fragment>

          ))}

          <UsaButton buttonStyle="outline" onClick={defaultDateRange}>
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
          {getStart().toLocaleDateString()} - {getEnd().toLocaleDateString()}
        </UsaButton>
      </span>
    </span>
  );

  return (
    <React.Fragment>
      <span>Case Creation Range: </span>
      <TooltipTrigger
        placement="bottom"
        trigger="click"
        tooltip={Tooltip}
        tooltipShown={show}
      >
        {Trigger}
      </TooltipTrigger>
    </React.Fragment>

  );
};

export { DateRangePicker };
