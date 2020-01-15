import React from "react";
import { storiesOf } from "@storybook/react";
import { DetailNoteDisplay } from "../view/tables/DetailNoteDisplay";

storiesOf("DetailNoteDisplay", module)
  .add("Trouble ticket", () => {
    const note = {
      type: "LINK",
      subType: "troubleticket",
      href: "http://localhost:1111/12345",
      content: "12345"
    };
    return <DetailNoteDisplay caseDetail={note} />;
  })
  .add("General comment", () => {
    const note = {
      type: "COMMENT",
      content: "This is a general comment."
    };
    return <DetailNoteDisplay caseDetail={note} />;
  });
