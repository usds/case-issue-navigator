import React, {  useState } from "react";
import UsaButton from "../util/UsaButton";
import Popper from "../util/Popper";
import "./CaseAgeFilter.scss";

interface Props {
  start?: Date;
  end?: Date;
  lastUpdated?: string;
  caselist: Case[];
  onStartChange: (start?: Date) => void;
  onEndChange: (start?: Date) => void;
  onSubmit: () => void;
}

const CaseAgeFilter: React.FunctionComponent<Props> = props => {
  const [show, setShow] = useState(false);

  const togglePopper = () => {
    setShow(!show);
  }
  const hidePopper = () => setShow(false);

  const getStart = () => {
    if (props.start) {
      return props.start;
    }
    if (props.caselist.length) {
      return new Date(props.caselist[0].caseCreation);
    }
    return new Date();
  };

  const getEnd = () => {
    if (props.end) {
      return props.end;
    }
    if (props.lastUpdated) {
      const end = new Date(props.lastUpdated);
      // HACK: This hard codes the fact that the case data currntly include cases older than 1 year
      end.setFullYear(end.getFullYear() - 1);
      return end;
    }
    return new Date();
  };

  const setYear = (year: number) => {
    props.onStartChange(new Date(`01/01/${year}`));
    props.onEndChange(new Date((year + 1).toString()));
    hidePopper();
    props.onSubmit();
  };

  const defaultDateRange = () => {
    props.onStartChange();
    props.onEndChange();
    hidePopper();
    props.onSubmit();
  };

  const tooltip = () => (
    <div className="caseCreationForm">
      {/* HACK: hard code years for current i90 case list */}
      {[2014, 2015, 2016, 2017, 2018].map(year => (
        <React.Fragment key={year}>
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
  );

  const trigger = () => (
    <UsaButton onClick={togglePopper}>
      {getStart().toLocaleDateString()} - {getEnd().toLocaleDateString()}
    </UsaButton>
  );

  if (props.caselist.length <= 0 && !props.start && !props.end) {
    return null;
  }

  return (
    <React.Fragment>
      <span>Case Creation Range: </span>
      <Popper
        trigger={trigger()}
        tooltip={tooltip()}
        show={show}
        onClickOutside={hidePopper}
      />
    </React.Fragment>
  );
};

export { CaseAgeFilter };
