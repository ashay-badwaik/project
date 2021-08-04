import React from "react";
import { render, cleanup, getAllByText, fireEvent, getByText, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import renderer from "react-test-renderer";
import { GET_DATA_RIGHT } from "./../GraphQL/querry.js";
import wait from "waait";
import RightComponent from "./rightComponent";

test("should render without error", () => {
  render(
    <MockedProvider>
      <RightComponent />
    </MockedProvider>
  );
});

test("click contact", async () => {
    const component = render(
        <MockedProvider>
            <RightComponent/> 
        </MockedProvider>
    );

    const contact = screen.getByTestId('contact');

    fireEvent.click(contact);

    await wait(100);
    const popup = screen.getByTestId('popup-box');
    expect(popup).toBeInTheDocument()
})

test("open-close-popup", async () => {
    const component = render(
        <MockedProvider>
            <RightComponent/>
        </MockedProvider>
    );

    const contact = screen.getByTestId('contact');
    fireEvent.click(contact);

    await wait(100);

    const closeBtn = screen.getByTestId('close-button');
    const popup = screen.getByTestId('popup-box');

    fireEvent.click(closeBtn);

    expect(popup).not.toBeInTheDocument()
})

test("render loading state", () => {
  const { getAllByText } = render(
    <MockedProvider>
      <RightComponent />
    </MockedProvider>
  );

  expect(getAllByText("loading")).toHaveLength(2);
});

test("render error state", async () => {
  const mock = {
    request: { query: GET_DATA_RIGHT },
    error: new Error("erroe"),
  };

  const component = renderer.create(
    <MockedProvider mocks={[mock]} addTypename={false}>
      <RightComponent />
    </MockedProvider>
  );

  await wait(100);

  const h1 = component.root.findByType("h1");
  expect(h1.children).toContain("error");

  const p = component.root.findByType("p");
  expect(p.children).toContain("error");
});

test("render content", async () => {
  const heading = "Type Text";

  const para =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

  const mock = {
    request: { query: GET_DATA_RIGHT },
    result: { data: { getAllContentData: [{ rightheading: heading, rightpara: para }] } },
  };

  const component = renderer.create(
    <MockedProvider mocks={[mock]} addTypename={false}>
      <RightComponent />
    </MockedProvider>
  );

  await wait(100)

  const h1 = component.root.findByType("h1");
  expect(h1.children[0]).toEqual(heading);

  const p = component.root.findByType("p");
  expect(p.children[0]).toEqual(para);
});

