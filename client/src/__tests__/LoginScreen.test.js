import React from "react";

import { render } from "@testing-library/react-native";

import LoginScreen from "../screens/LoginScreen";

describe("", () => {
  it("Should render correctly", () => {
    const wrapper = render(<LoginScreen />);
    wrapper.getByText("Log In");
    wrapper.getByText("create anew user");
  });
});
