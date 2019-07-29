import { configure } from "@storybook/react";
import requireContext from "require-context.macro";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

import "../src/App.css";
import "../src/index.css";

const req = requireContext("../", true, /stories\.jsx/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
