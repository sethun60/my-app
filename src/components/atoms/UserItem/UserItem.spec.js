import React from "react";
import { render, cleanup } from "@testing-library/react";
import UserItem from "./UserItem";

describe("User item", () => {
  const initProps = {
    id: "817e299e-8662-464d-9019-c3fa19a671dc",
    firstName: "Timothy",
    lastName: "Medhurst",
    displayName: "timothyMedhurst",
    avatarUrl: "https://cdn.fakercloud.com/avatars/begreative_128.jpg",
    location: "West Lacy",
  };

  afterEach(cleanup);

  afterEach(() => {
    jest.resetModules();
  });

  it("Should render user item component", () => {
    const component = render(<UserItem {...initProps} />);
    const userItemContainer = component.getByTestId("user-item-container");
    expect(component).toBeDefined();
    expect(userItemContainer).toBeVisible();
  });
});
