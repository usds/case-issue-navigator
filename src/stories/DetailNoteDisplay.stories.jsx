import React from "react";
import { storiesOf } from "@storybook/react";
import { DetailNoteDisplay } from "../view/tables/DetailNoteDisplay";

storiesOf("DetailNoteDisplay", module)
  .add("Trouble ticket", () => {
    const note = {
      subType: "troubleticket",
      href: "http://localhost:1111/12345",
      content: "12345"
    };
    return <DetailNoteDisplay note={note} />;
  })
  .add("Assignee", () => {
    const note = {
      subType: "assignee",
      content: "Joe"
    };
    return <DetailNoteDisplay note={note} />;
  })
  .add("General comment", () => {
    const note = {
      content: "This is a general comment."
    };
    return <DetailNoteDisplay note={note} />;
  });
