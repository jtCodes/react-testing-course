import SignUpPage from "./SignUpPage";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

describe("Sign Up Page", () => {
  describe("layout", () => {
    it("has header", () => {
      render(<SignUpPage />);
      const header = screen.queryByRole("heading", { name: "Sign Up" });
      expect(header).toBeInTheDocument();
    });

    it("has username input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Username");
      expect(input).toBeInTheDocument();
    });

    it("has email input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Email");
      expect(input).toBeInTheDocument();
    });

    it("has email type for email input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Email");
      expect(input.type).toBe("email");
    });

    it("has password input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Password");
      expect(input).toBeInTheDocument();
    });

    it("has password type for password input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Password");
      expect(input.type).toBe("password");
    });

    it("has password repeat input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Password Repeat");
      expect(input).toBeInTheDocument();
    });

    it("has password type for password repeat input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Password Repeat");
      expect(input.type).toBe("password");
    });

    it("has Sign Up button", () => {
      render(<SignUpPage />);
      const signUp = screen.queryByRole("button", { name: "Sign Up" });
      expect(signUp).toBeInTheDocument();
    });

    it("has disables Sign Up button initially", () => {
      render(<SignUpPage />);
      const signUp = screen.queryByRole("button", { name: "Sign Up" });
      expect(signUp).toBeDisabled();
    });
  });

  describe("interactions", () => {
    it("enables the button when password and password repeat fields have same value", () => {
      render(<SignUpPage />);
      const passwordInput = screen.getByLabelText("Password");
      const passwordRepeatInput = screen.getByLabelText("Password Repeat");
      userEvent.type(passwordInput, "Password");
      userEvent.type(passwordRepeatInput, "Password");
      const signUpButton = screen.queryByRole("button", { name: "Sign Up" });
      expect(signUpButton).toBeEnabled();
    });

    it("sends username, email and password to backend after clicking the button", () => {
      render(<SignUpPage />);
      const usernameInput = screen.getByLabelText("Username");
      const emailInput = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText("Password");
      const passwordRepeatInput = screen.getByLabelText("Password Repeat");

      userEvent.type(usernameInput, "user1");
      userEvent.type(emailInput, "224f@gmail.com");
      userEvent.type(passwordInput, "Password");
      userEvent.type(passwordRepeatInput, "Password");

      const signUpButton = screen.queryByRole("button", { name: "Sign Up" });
      const mockFn = jest.fn();
      axios.post = mockFn;

      userEvent.click(signUpButton);

      const firstCallOfMockFunction = mockFn.mock.calls[0];
      const body = firstCallOfMockFunction[1];
      expect(body).toEqual({
        username: "user1",
        email: "224f@gmail.com",
        password: "Password",
      });
    });
  });
});
