import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { browserMock } from "./testConfig/browserMock";

configure({
  adapter: new Adapter()
});

browserMock();
