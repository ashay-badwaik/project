import React from "react";
import { render, cleanup, getAllByText, fireEvent, getByText, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import renderer from "react-test-renderer";
import LeftComponent from "./leftComponent";
import { GET_DATA_LEFT } from "./../GraphQL/querry.js";
import wait from "waait";

test("should render without error", () => {
  const component = render(
    <MockedProvider mocks={[]}>
      <LeftComponent />
    </MockedProvider>
  );
});

test("render loading state", () => {
  const { getAllByText } = render(
    <MockedProvider>
      <LeftComponent />
    </MockedProvider>
  );

  expect(getAllByText("loading")).toHaveLength(2);
});

test("render content", async () => {
  const leftheading =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

  const leftpara =
    "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";

  const mock = {
    request: { query: GET_DATA_LEFT },
    result: {
      data: { getAllContentData: [{ leftheading: leftheading, leftpara: leftpara }] },
    },
  };

  const component = renderer.create(
    <MockedProvider mocks={[mock]} addTypename={false}>
      <LeftComponent />
    </MockedProvider>
  );

  await wait(100);

  const h1 = component.root.findByType("h1");
  expect(h1.children[0]).toEqual(leftheading);

  const p = component.root.findByType("p");
  expect(p.children[0]).toEqual(leftpara);
});

test("render error state", async () => {
  const mock = {
    request: { query: GET_DATA_LEFT },
    error: new Error("erroe"),
  };

  const component = renderer.create(
    <MockedProvider mocks={[mock]} addTypename={false}>
      <LeftComponent />
    </MockedProvider>
  );

  await wait(0);

  const h1 = component.root.findByType("h1");
  expect(h1.children).toContain("Error");

  const p = component.root.findByType("p");
  expect(p.children).toContain("Error");
});

test('store badges', () => {
  const component = render(
    <MockedProvider>
      <LeftComponent/>
    </MockedProvider>
  );

  const appStoreBadge = screen.getByTestId('appstore');
  expect(appStoreBadge.href).toBe("https://www.apple.com/in/app-store/");

  const playStoreBadge = screen.getByTestId('playstore');
  expect(playStoreBadge.href).toBe("https://play.google.com/store");
})