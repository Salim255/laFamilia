import React from "react";

import { screen, render } from "@testing-library/react-native";
import App from "./App";
it("render default text", () => {
  render(<App />);
  //let t = 1;
  // expect(t - 1).toEqual(0);
  //const snap = renderer.create(<App />).toJSON();
  //Test whether button exist or not, so 1st get the button
  const btnElement = screen.getByRole("button", {
    name: "Open up App.js to start working on your app!",
    exact: false,
  });
  //Performe assertion
});
