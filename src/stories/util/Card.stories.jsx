import React from "react";
import { storiesOf } from "@storybook/react";
import { Card } from "../../view/util/Card";

storiesOf("Card", module)
  .add("no content", () => <Card header="" />)
  .add("with text", () => <Card header="">Hi I'm a well</Card>);
