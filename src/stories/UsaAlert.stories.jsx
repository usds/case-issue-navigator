import React from "react";
import { storiesOf } from "@storybook/react";
import { UsaAlert } from "../view/util/UsaAlert";

storiesOf("UsaAlert", module)
  .add("Success", () => (
    <UsaAlert
      alertType="success"
      heading="Success status"
      text={
        <React.Fragment>
          Lorem ipsum dolor sit amet,{" "}
          <a href="http://example.com">consectetur adipiscing</a> elit, sed do
          eiusmod.
        </React.Fragment>
      }
    />
  ))
  .add("warning", () => (
    <UsaAlert
      alertType="warning"
      heading="Warning status"
      text={
        <React.Fragment>
          Lorem ipsum dolor sit amet,{" "}
          <a href="http://example.com">consectetur adipiscing</a> elit, sed do
          eiusmod.
        </React.Fragment>
      }
    />
  ))
  .add("error", () => (
    <UsaAlert
      alertType="error"
      heading="Error status"
      text={
        <React.Fragment>
          Lorem ipsum dolor sit amet,{" "}
          <a href="http://example.com">consectetur adipiscing</a> elit, sed do
          eiusmod.
        </React.Fragment>
      }
    />
  ))
  .add("info", () => (
    <UsaAlert
      alertType="info"
      heading="Informative status"
      text={
        <React.Fragment>
          Lorem ipsum dolor sit amet,{" "}
          <a href="http://example.com">consectetur adipiscing</a> elit, sed do
          eiusmod.
        </React.Fragment>
      }
    />
  ));
