import React from "react";
import { Manager, Reference, Popper } from "react-popper";
import "./DateRangePicker.scss";

interface Props {}

const DateRangePicker: React.FunctionComponent<Props> = props => {
  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <button type="button" ref={ref}>
            Reference element
          </button>
        )}
      </Reference>
      <Popper placement="bottom">
        {({ ref, style, placement, arrowProps }) => (
          <div
            ref={ref}
            style={style}
            data-placement={placement}
            className="popper"
          >
            Popper element
          </div>
        )}
      </Popper>
    </Manager>
  );
};

export { DateRangePicker };
