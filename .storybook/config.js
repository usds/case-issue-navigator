import { configure } from "@storybook/react";
import requireContext from "require-context.macro";

import "../src/App.css";
import "../src/index.css";

const req = requireContext("../", true, /stories\.jsx/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
