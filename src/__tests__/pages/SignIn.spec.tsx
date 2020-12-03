import { render, fireEvent } from "@testing-library/react";
import React from "react";
import SignIn from "../../pages/SignIn";

const mockedHistoryPush = jest.fn();

jest.mock("react-router-dom", () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe("SignIn page", () => {
  it("should be able to sign in", () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText("E-mail");
    const passwordField = getByPlaceholderText("Senha");
    const buttonElement = getByText("Entrar");

    fireEvent.change(emailField, {
      target: { value: "igor.barbosa14@email.com" },
    });
    fireEvent.change(passwordField, { target: { value: "123456" } });
    fireEvent.click(buttonElement);

    expect(mockedHistoryPush).toHaveBeenCalledWith("/dashboard");
  });
});
