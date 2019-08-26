import React from "react";
import { storiesOf } from "@storybook/react";
import { DetailDisplay } from "../view/tables/DetailDisplay";

storiesOf("DetailDisplay", module)
  .add("Trouble ticket", () => {
    const note = {
      subType: "troubleticket",
      href: "http://localhost:1111/12345",
      content: "12345"
    };
    return <DetailDisplay note={note} />;
  })
  .add("Assignee", () => {
    const note = {
      subType: "assignee",
      content: "Joe"
    };
    return <DetailDisplay note={note} />;
  })
  .add("General comment", () => {
    const note = {
      content: "This is a general comment."
    };
    return <DetailDisplay note={note} />;
  });
