import React, { useState } from "react";
import { render, cleanup, queryByTitle, fireEvent, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import renderer from "react-test-renderer";
import { SEND_MESSAGE } from "./../GraphQL/mutations.js";
import wait from "waait";
import Popup from "./popup";
import { iterateObserversSafely, storeKeyNameFromField } from "@apollo/client/utilities";


test("render structure", () => {
  render(
    <MockedProvider>
      <Popup />
    </MockedProvider>
  );
});

test("render close button", () => {
    const component = render(
        <MockedProvider>
            <Popup/>
        </MockedProvider>
    );

    const btn = screen.getByTestId("close-button");
    expect(btn).toBeTruthy();
})



test("onClick close", () => {
    let popup = false;
    const pfun = () => {
        popup = true;
    }

    const component = render(
        <MockedProvider>
            
            <Popup popupOpen={pfun}/>
        </MockedProvider>
    );
    const btn = screen.getByTestId("close-button");
    fireEvent.click(btn);
    
    expect(popup).toBe(true);
    // expect(screen.getByTestId("popup-box")).not.toBeInTheDocument()
});



test("submit-button-render", () => {
    const component = render(
        <MockedProvider>
            <Popup/>
        </MockedProvider>
    );

    const btn = screen.getByTestId("submit-button");
    expect(btn).toBeTruthy();
})


test("onClick submit", async () => {
    const message = {
        name: "abcde",
        email: "abcde@mail.com",
        message: "hi",
      };
    
      const mock = [
        {
          request: {
            query: SEND_MESSAGE,
            variables: message,
          },
          newData: jest.fn(() => ({
              data: {
                  sendMessage: message
                }
          })),
          result: { data: { message } },
        },
      ];

    const component = render(
        <MockedProvider mocks = {mock} addTypename={false}>
            <Popup />
        </MockedProvider>,
       
    );

    
    await wait(100);
    const btn = screen.getByTestId("submit-button");
    fireEvent.click(btn);
    
    await wait(100);

    const inputName = screen.getByTestId("name-input");
    expect(inputName.value).toBe("");
});



test("loading state", () => {
  const message = {
    name: "abcde",
    email: "abcde@mail.com",
    message: "nothing",
  };

  const mock = [
    {
      request: {
        query: SEND_MESSAGE,
        variables: message,
      },
      result: { data: { message } },
    },
  ];

  const component = renderer.create(
    <MockedProvider mocks={mock} addTypename={false}>
      <Popup />
    </MockedProvider>
  );
  const button = component.root.findByType("button");
  button.props.onClick();

  const p = component.root.findByType("p");
  expect(p.children).toContain("Sending message...");
});

test("error state", async () => {
  const message = {
    name: "abcde",
    email: "abcde@mail.com",
    message: "nothing",
  };

  const mock = [
    {
      request: {
        query: SEND_MESSAGE,
        variables: message,
      },
      result: { errors: [{ message: "erroe" }] },
      error: new Error("erroe"),
    },
  ];

  const component = render(
    <MockedProvider mocks={mock} addTypename={false}>
      <Popup />
    </MockedProvider>
  );

  await wait(100);
    // const btn = screen.getByTestId("submit-button");
    // fireEvent.click(btn);

    // const mutation = mock[0].newData;

    // await wait(100);

    // expect(mutation).toHaveBeenCalled();

  const button =screen.getByTestId("submit-button");
  fireEvent.click(button);

  await wait(10);

  const p = screen.getByTestId("error");
  expect(p.children).toBe("Some error occured...");
});


test("normal response", async () => {
    const message = {
        name: "abcde",
        email: "abcde@mail.com",
        message: "hi",
        };
    
    const mock = [
        {
            request: {
                query: SEND_MESSAGE,
                variables: message,
            },
            result: { data: { message } },
        },
    ];
    
    const component = render(
        <MockedProvider mocks={mock} addTypename={false}>
            <Popup />
        </MockedProvider>
    );

    await wait(100);
    const btn = screen.getByTestId("submit-button");
    fireEvent.click(btn);
    
    await wait(100);

    const inputName = screen.getByTestId("name-input");
    expect(inputName.value).toBe("");
});
