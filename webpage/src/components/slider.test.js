import React from "react";
import { render, cleanup, getAllByText, fireEvent, getByText, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Slider from "./slider";
import wait from "waait";
import { ApolloProvider } from "@apollo/client";

test("element render", () => {
    render(
        <MockedProvider>

            <Slider/>
        </MockedProvider>
    )
});

test("next button", () => {
    const component = render(
        <MockedProvider>

            <Slider/>
        </MockedProvider>
    );

    expect(screen.getByTestId('next-btn')).toBeInTheDocument();
    
})

test("next button click", () => {
    const component = render(
        <MockedProvider>
            <Slider/>
        </MockedProvider>
    );

    const btn = screen.getByTestId('next-btn');
    fireEvent.click(btn);

    const img = screen.getByTestId('second');
    expect(img).toBeInTheDocument();

    fireEvent.click(btn);

    const img2 = screen.getByTestId('first');
    expect(img2).toBeInTheDocument();
})