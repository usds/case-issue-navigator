import { shallow } from "enzyme";
import { buttonizer } from "../buttonizer";

describe("buttonizer", () => {
  const myFunc = jest.fn(x => x);
  const callback = {
    myFunc: rowdata => myFunc(rowdata)
  };
  const rowdata = {
    receiptNumber: "FAK123"
  };
  const buttonized = buttonizer("Click Me", "outline", "myFunc");

  it("renders a button", () => {
    const Button = buttonized(null, rowdata, null, callback);
    expect(Button).toMatchSnapshot();
  });
  it("executes callback when clicked", () => {
    const Button = shallow(buttonized(null, rowdata, null, callback));
    Button.simulate("click");
    expect(myFunc).toHaveBeenCalledTimes(1);
  });
});
