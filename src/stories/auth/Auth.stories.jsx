import React from "react";
import { storiesOf } from "@storybook/react";
import { AuthForm } from "../../view/auth/AuthForm";

storiesOf("AuthForm", module).add("AuthForm view", () => (
  <AuthForm loginUrl={"#test-link"} />
));
