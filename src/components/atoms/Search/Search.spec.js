import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Search from "./Search";

describe("Search", () => {
  const mockOnChange = jest.fn();

  afterEach(cleanup);

  afterEach(() => {
    jest.resetModules();
  });

  it("Should render search component", () => {
    const component = render(<Search onChange={mockOnChange} />);
    const searchContainer = component.getByTestId("search-container");
    expect(component).toBeDefined();
    expect(searchContainer).toBeVisible();
  });

  it("Should call onChanage prop with input value", () => {
    const component = render(<Search onChange={mockOnChange} />);

    const searchInputField = component.getByTestId("search-input");
    fireEvent.input(searchInputField, {
      target: { value: "foo" },
    });
    expect(searchInputField.value).toEqual("foo");
  });
});
