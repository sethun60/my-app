import React from "react";
import { render, cleanup } from "@testing-library/react";
import TeamItem from "./TeamItem";

describe("Team Item", () => {
  const initProps = {
    id: "7676a4bf-adfe-415c-941b-1739af07039b",
    name: "Ordinary Coral Lynx",
  };

  afterEach(cleanup);

  afterEach(() => {
    jest.resetModules();
  });

  it("Should render team item component", () => {
    const component = render(<TeamItem {...initProps} />);
    const teamItemContainer = component.getByTestId("team-item-container");
    expect(component).toBeDefined();
    expect(teamItemContainer).toBeVisible();
  });
});
