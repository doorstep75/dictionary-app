/* This is a snapshot test for the App component.
  It renders the App component, converts it to a JSON tree, and compares it with the previous snapshot.
  If the rendered output of the component changes, the test will fail, indicating a difference between 
the current and previous output. */

import React from "react";
import renderer from "react-test-renderer";
import App from "../App";

test("renders App component correctly", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});