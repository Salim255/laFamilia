import Input from "../components/Auth/Input";
import React from "react";

import { screen, render } from "@testing-library/react-native";

describe("", () => {
  it("Should render input component correctly", () => {
    const wrapper = render(<Input />);
    wrapper.getByTestId("input-id");
    wrapper.getByTestId("label");
    wrapper.getByTestId("text-input");
  });
});
