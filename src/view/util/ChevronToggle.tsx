import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UsaButton from "./UsaButton";

interface ChevronToggleProps {
  open: boolean;
  toggle: (event: React.MouseEvent<HTMLButtonElement>) => void;
  ariaLabel: string;
}

const ChevronToggle: React.FunctionComponent<ChevronToggleProps> = props => {
  const icon = props.open ? (
    <FontAwesomeIcon icon="minus" />
  ) : (
    <FontAwesomeIcon icon="plus" />
  );
  return (
    <UsaButton
      buttonStyle="none"
      onClick={props.toggle}
      ariaLabel={props.ariaLabel}
    >
      {icon}
    </UsaButton>
  );
};

export { ChevronToggle };
