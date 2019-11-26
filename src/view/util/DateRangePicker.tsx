import React, { useState } from "react";
import { Manager, Reference, Popper } from "react-popper";
import "./DateRangePicker.scss";

interface Props {}

const DateRangePicker: React.FunctionComponent<Props> = props => {
  const [show, setShow] = useState(false);

  const togglePopper = () => setShow(!show);
  const hidePopper = () => setShow(false);

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <button type="button" ref={ref} onClick={togglePopper}>
            Reference element
          </button>
        )}
      </Reference>
      <Popper placement="bottom">
        {({ ref, style, placement }) => {
          const popperStyle = {...style};
          popperStyle.display = show ? "inherit" : "none";
          return (      <div
            ref={ref}
            style={popperStyle}
            data-placement={placement}
            className="popper"
          >
            Popper element
            <button type="button" ref={ref} onClick={hidePopper}>
              hide
            </button>
          </div>
        )
        }
    }
      </Popper>
    </Manager>
  );
};

export { DateRangePicker };
