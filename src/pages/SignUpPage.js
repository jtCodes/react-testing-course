import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import Card from "../Card";
import Input from "./Input";

export default function SignUpPage() {
  const [apiProgress, setApiProgress] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const inputs = [
    {
      id: "username",
      type: "username",
      label: "Username",
      value: formData.username,
    },
    {
      id: "email",
      type: "email",
      label: "Email",
      value: formData.email,
    },
    {
      id: "password",
      type: "password",
      label: "Password",
      value: formData.password,
    },
    {
      id: "passwordRepeat",
      type: "password",
      label: "Password Repeat",
      value: formData.passwordRepeat,
    },
  ];

  function isSignUpButtonDisabled() {
    return (
      formData.password.length === 0 ||
      formData.passwordRepeat.length === 0 ||
      formData.password !== formData.passwordRepeat ||
      apiProgress
    );
  }

  function onFormChange(e) {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  }

  async function submit(e) {
    e.preventDefault();
    const body = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };
    setApiProgress(true);
    try {
      await axios.post("/api/1.0/users", body);
      setIsSignUpSuccess(true);
    } catch (error) {}
  }

  return (
    <div className="flex justify-center h-screen">
      <div className="self-center">
        <Card
          classNames={isSignUpSuccess ? "bg-green-400 text-slate-50" : ""}
          content={
            isSignUpSuccess ? (
              <>
                <h1 className="text-4xl font-bold text-center mb-10">
                  Success
                </h1>
                <div className="text-lg font-medium">
                  Please check your email to activate your account
                </div>
              </>
            ) : (
              <form
                className="flex flex-col gap-3 w-[500px] h-max self-center"
                onChange={onFormChange}
                data-testid="form-sign-up"
              >
                <h1 className="text-5xl font-semibold text-center text-slate-800 mb-10">
                  Sign Up
                </h1>
                {inputs.map((inputData) => (
                  <Input {...inputData} />
                ))}
                <button
                  className="mt-10 bg-sky-300 hover:bg-sky-400 active:bg-sky-700 text-slate-50 
                  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-slate-100 disabled:text-slate-200"
                  disabled={isSignUpButtonDisabled()}
                  onClick={submit}
                >
                  <div className="flex justify-center">
                    {apiProgress ? (
                      <div role="status">
                        <Bars height="25" width="100" color="grey" />
                      </div>
                    ) : (
                      "Sign Up"
                    )}
                  </div>
                </button>{" "}
              </form>
            )
          }
        />
      </div>
    </div>
  );
}
