import React, { useState } from "react";
import { Manager, Reference, Popper } from "react-popper";
import UsaTextInput from "../forms/UsaTextInput";
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

  const onSubmit = () => {
    hidePopper();
    props.onSubmit();
  }

  const lastMonth = () => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth()-1);
    const end = new Date(today.getFullYear(), today.getMonth());
    end.setDate(end.getDate() -1);
    props.onStartChange(start);
    props.onEndChange(end);
  }

  const thisMonth = () => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth());
    const end = new Date(today.getFullYear(), today.getMonth() +1);
    end.setDate(end.getDate() -1);
    props.onStartChange(start);
    props.onEndChange(end);
  }

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <div ref={ref}>
            Case Creation Range:
            <UsaButton ref={ref} onClick={togglePopper}>
              {props.start.toLocaleDateString()} - {props.end.toLocaleDateString()}
            </UsaButton>
          </div>

        )}
      </Reference>
      <Popper placement="bottom">
        {({ ref, style, placement }) => {
          const popperStyle = { ...style };
          popperStyle.display = show ? "inherit" : "none";
          return (
            <div
              ref={ref}
              style={popperStyle}
              data-placement={placement}
              className="popper"
            >
              <form className="usa-form">
                <div style={{textAlign: "center"}}>
                  <UsaButton buttonStyle="outline" onClick={lastMonth}>
                    Last Month
                  </UsaButton>
                  <br/>
                  <UsaButton buttonStyle="outline" onClick={thisMonth}>
                    This Month
                  </UsaButton>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ paddingRight: "5px"}}>
                    <UsaTextInput
                      label="Start"
                      name="start"
                      value={props.start.toLocaleDateString()}
                      onChange={() => undefined}
                    />
                  </div>
                  <div style={{ paddingLeft: "5px"}}>
                    <UsaTextInput
                      label="End"
                      name="end"
                      value={props.end.toLocaleDateString()}
                      onChange={() => undefined}
                    />
                  </div>
                </div>
              <div style={{textAlign: "right", marginRight: "-8px"}}>
                <UsaButton buttonStyle="outline" ref={ref} onClick={hidePopper}>
                  Reset
                </UsaButton>
                <UsaButton ref={ref} onClick={onSubmit}>
                  Apply
                </UsaButton>
              </div>

              </form>
            </div>
          );
        }}
      </Popper>
    </Manager>
  );
};

export { DateRangePicker };
