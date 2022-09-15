import SignUpPage from "./SignUpPage";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";

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
    let requestBody;
    let counter = 0;
    const server = setupServer(
      rest.post("/api/1.0/users", (req, res, ctx) => {
        requestBody = req.body;
        counter += 1;
        return res(ctx.status(200));
      })
    );

    beforeEach(() => {
      counter = 0;
      server.resetHandlers();
    });

    beforeAll(() => server.listen());

    afterAll(() => server.close());

    let signUpButton;
    const setup = () => {
      render(<SignUpPage />);
      const usernameInput = screen.getByLabelText("Username");
      const emailInput = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText("Password");
      const passwordRepeatInput = screen.getByLabelText("Password Repeat");

      userEvent.type(usernameInput, "user1");
      userEvent.type(emailInput, "224f@gmail.com");
      userEvent.type(passwordInput, "Password");
      userEvent.type(passwordRepeatInput, "Password");

      signUpButton = screen.queryByRole("button", { name: "Sign Up" });
    };

    it("enables the button when password and password repeat fields have same value", () => {
      setup();
      expect(signUpButton).toBeEnabled();
    });

    it("sends username, email and password to backend after clicking the button", async () => {
      setup();

      userEvent.click(signUpButton);

      await screen.findByText(
        "Please check your email to activate your account"
      );

      expect(requestBody).toEqual({
        username: "user1",
        email: "224f@gmail.com",
        password: "Password",
      });
    });

    it("disables button when there is an onging api call", async () => {
      setup();

      userEvent.click(signUpButton);
      userEvent.click(signUpButton);

      await screen.findByText(
        "Please check your email to activate your account"
      );

      expect(counter).toBe(1);
    });

    it("displays spinner after clicking the submit", async () => {
      setup();
      expect(screen.queryByRole("status")).not.toBeInTheDocument();

      userEvent.click(signUpButton);
      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });

    it("displays account activation notification after successful sign up", async () => {
      setup();
      userEvent.click(signUpButton);
      const text = await screen.findByText(
        "Please check your email to activate your account"
      );
      expect(text).toBeInTheDocument();
    });

    it("hides sign up after successful sign up request", async () => {
      setup();
      const form = screen.getByTestId("form-sign-up");
      userEvent.click(signUpButton);
      await waitFor(() => {
        expect(form).not.toBeInTheDocument();
      });
    });

    const generateValidationError = (field, message) => {
      return rest.post("/api/1.0/users", (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            validationErrors: { [field]: message },
          })
        );
      });
    };

    it.each`
      field         | message
      ${"username"} | ${"Username cannot be null"}
      ${"email"}    | ${"Email cannot be null"}
      ${"password"} | ${"Password cannot be null"}
    `("displays $message for $field", async ({ field, message }) => {
      server.use(generateValidationError(field, message));
      setup();
      userEvent.click(signUpButton);
      const validationError = await screen.findByText(message);
      expect(validationError).toBeInTheDocument(0);
    });

    it("hides spinner and enables button after respoonse received", async () => {
      server.use(
        generateValidationError("username", "Username cannot be null")
      );
      setup();
      userEvent.click(signUpButton);
      const validationError = await screen.findByText(
        "Username cannot be null"
      );
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
      expect(signUpButton).toBeEnabled();
    });

    it("display mismatch message for password repeat input", () => {
      setup()
      userEvent.type(passwordInput, "Password");
      userEvent.type(passwordRepeatInput, "Passwordfdd");
    })
  });
});
