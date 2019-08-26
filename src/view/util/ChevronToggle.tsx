import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UsaButton from "./UsaButton";

interface ChevronToggleProps {
  open: boolean;
  toggle: (event: MouseEvent) => void;
}

const ChevronToggle: React.FunctionComponent<ChevronToggleProps> = props => {
  const icon = props.open ? (
    <FontAwesomeIcon icon="chevron-down" />
  ) : (
    <FontAwesomeIcon icon="chevron-right" />
  );
  return (
    <UsaButton buttonStyle="none" onClick={props.toggle}>
      {icon}
    </UsaButton>
  );
};

export { ChevronToggle };
