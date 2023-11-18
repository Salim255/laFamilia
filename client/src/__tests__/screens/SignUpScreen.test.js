import React from "react";

import { screen, render } from "@testing-library/react-native";

import SignUpScreen from "../../screens/SignUpScreen";
describe("", () => {
  it("Should render correctly", () => {
    const wrapper = render(<SignUpScreen />);
    wrapper.getByTestId("sign-up-screen");
  });
});
