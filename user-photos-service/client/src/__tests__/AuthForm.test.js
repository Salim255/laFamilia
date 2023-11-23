import AuthForm from "../components/Auth/AuthForm";
import React from "react";

import { screen, render } from "@testing-library/react-native";

describe("", () => {
  it("Should render authForm component correctly", () => {
    const wrapper = render(<AuthForm />);
    wrapper.getByTestId("form-id");
    wrapper.getByTestId("input-section");
    wrapper.getByText("Email Address");
    wrapper.getByText("Confirm Email Address");
    wrapper.getByText(" Password ");
    wrapper.getByText("Confirm Password ");
  });
});
