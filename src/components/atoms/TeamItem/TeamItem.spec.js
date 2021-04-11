import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, cleanup, fireEvent } from "@testing-library/react";
import TeamItem from "./TeamItem";

describe("Team Item", () => {
  const initProps = {
    id: "7676a4bf-adfe-415c-941b-1739af07039b",
    name: "Ordinary Coral Lynx",
  };

  const mockHistoryPush = jest.fn();

  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
      push: mockHistoryPush,
    }),
  }));

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

  //   it("Should take to team page when clicked on a team", () => {
  //     const component = render(
  //       <MemoryRouter>
  //         <TeamItem {...initProps} />
  //       </MemoryRouter>
  //     );
  //     const teamItemContainer = component.getByTestId("team-item-container");

  //     console.log("teamItemContainer", teamItemContainer);
  //     fireEvent.click(teamItemContainer);
  //     expect(mockHistoryPush).toHaveBeenCalledWith(`/team?id=${initProps.id}`);
  //   });
});
