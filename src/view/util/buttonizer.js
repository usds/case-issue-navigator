import React from "react";
import UsaButton from "./UsaButton";

const buttonizer = (text, buttonClass, callbackKey) => {
  return (_, rowData, __, callback) => (
    <UsaButton
      onClick={() => callback[callbackKey](rowData)}
      buttonStyle={buttonClass}
    >
      {text}
    </UsaButton>
  );
};

export { buttonizer };
