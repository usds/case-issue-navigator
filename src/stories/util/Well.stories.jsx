import React from "react";
import { storiesOf } from "@storybook/react";
import { Well } from "../../view/util/Well";

storiesOf("Well", module)
  .add("no content", () => <Well />)
  .add("with text", () => <Well>Hi I'm a well</Well>);
