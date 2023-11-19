import AuthContent from "../components/Auth/AuthContent";
import React from "react";

import { screen, render } from "@testing-library/react-native";

describe("", () => {
  it("Should render authContent component correctly", () => {
    const wrapper = render(<AuthContent />);

    wrapper.getByText("login");
    wrapper.getByText("Sign Up");
  });
});
