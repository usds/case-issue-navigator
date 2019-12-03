import React, { useEffect, useRef } from "react";
import TooltipTrigger from "react-popper-tooltip";
import "./Popper.scss";

interface Props {
  trigger: JSX.Element;
  tooltip: JSX.Element;
  show: boolean;
  onClickOutside: () => void;
}

const Popper: React.FunctionComponent<Props> = props => {
  /**
   * Hook that alerts clicks outside of the passed ref
   */
  const useOutsideAlerter = (
    extrenalTriggerRef: React.MutableRefObject<any>,
    extrenalPopperRef: React.MutableRefObject<any>
  ) => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event: any) => {
      if (extrenalTriggerRef.current && extrenalPopperRef.current) {
        if (
          !extrenalTriggerRef.current.contains(event.target) &&
          !extrenalPopperRef.current.contains(event.target)
        ) {
          props.onClickOutside();
        }
      }
    };

    useEffect(() => {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  };
  const extrenalTriggerRef = useRef(null);
  const extrenalPopperRef = useRef(null);
  useOutsideAlerter(extrenalTriggerRef, extrenalPopperRef);

  const Tooltip = ({ tooltipRef, getTooltipProps }: any) => (
    <div
      {...getTooltipProps({
        ref: tooltipRef,
        className: "popper"
      })}
    >
      <div ref={extrenalPopperRef}>{props.tooltip}</div>
    </div>
  );

  const Trigger = ({ getTriggerProps, triggerRef }: any) => (
    <span ref={extrenalTriggerRef}>
      <span {...getTriggerProps({ ref: triggerRef })}>{props.trigger}</span>
    </span>
  );

  return (
    <TooltipTrigger
      placement="bottom"
      trigger="click"
      tooltip={Tooltip}
      tooltipShown={props.show}
    >
      {Trigger}
    </TooltipTrigger>
  );
};

export default Popper;
