import React, { useEffect, useState } from "react";
import axios from "axios";
import { BallTriangle, Bars } from "react-loader-spinner";
import Card from "../Card";

export default function SignUpPage() {
  const [apiProgress, setApiProgress] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

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

  function submit(e) {
    e.preventDefault();
    const body = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };
    setApiProgress(true);
    axios.post("/api/1.0/users", body).then(() => {
      setIsSignUpSuccess(true);
    });
  }

  return (
    <div className="flex justify-center h-screen">
      <div className="self-center">
        <Card
          classNames={"bg-green-400 text-slate-50"}
          content={
            isSignUpSuccess ? (
              <>
                <h1 className="text-5xl font-bold text-center mb-10">
                  Success
                </h1>
                <div className="text-lg font-medium">
                  Please check your email to activate your account
                </div>
              </>
            ) : (
              <form
                className="flex flex-col gap-3 w-[600px] h-max self-center"
                onChange={onFormChange}
                data-testid="form-sign-up"
              >
                <h1 className="text-6xl font-bold text-center text-slate-800 mb-10">
                  Sign Up
                </h1>
                <label className="font-semibold" htmlFor="username">
                  Username
                </label>
                <input
                  className="border rounded-md border-zinc-100 shadow-inner py-2 px-3 text-gray-700 leading-tight"
                  id="username"
                  type="username"
                  value={formData.username}
                ></input>
                <label className="font-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  className="border rounded-md border-zinc-100 shadow-inner py-2 px-3 text-gray-700 leading-tight"
                  id="email"
                  type="email"
                  value={formData.email}
                ></input>
                <label className="font-semibold" htmlFor="password">
                  Password
                </label>
                <input
                  className="border rounded-md border-zinc-100 shadow-inner py-2 px-3 text-gray-700 leading-tight"
                  id="password"
                  type="password"
                  value={formData.password}
                ></input>
                <label className="font-semibold" htmlFor="passwordRepeat">
                  Password Repeat
                </label>
                <input
                  className="border rounded-md border-zinc-100 shadow-inner py-2 px-3 text-gray-700 leading-tight"
                  id="passwordRepeat"
                  type="password"
                  value={formData.passwordRepeat}
                ></input>
                <button
                  className="mt-10 bg-sky-300 hover:bg-sky-400 active:bg-sky-700 text-slate-50 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-slate-100 disabled:text-slate-200"
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
