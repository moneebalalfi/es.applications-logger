import { render } from "@testing-library/react";
import Home from "../pages";

describe("Home Page", () => {
  it("Rendered Correctly", () => {
    const { debug } = render(<Home />);

    debug();
  });
});
