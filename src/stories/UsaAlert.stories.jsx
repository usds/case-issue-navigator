import React from "react";
import { storiesOf } from "@storybook/react";
import { UsaAlert } from "../view/util/UsaAlert";

storiesOf("UsaAlert", module)
  .add("Success", () => <UsaAlert alertType="success">Well done!</UsaAlert>)
  .add("info", () => (
    <UsaAlert alertType="info">This is some information.</UsaAlert>
  ))
  .add("warning", () => (
    <UsaAlert alertType="warning">Watch out for this!</UsaAlert>
  ));
