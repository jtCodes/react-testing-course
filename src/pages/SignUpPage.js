import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SignUpPage() {
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
      formData.password !== formData.passwordRepeat
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
    axios.post("/api/1.0/users", body);
  }

  return (
    <div className="flex justify-center h-screen">
      <form
        className="flex flex-col gap-3 p-10 border border-zinc-100 rounded-xl w-[600px] h-max self-center shadow-md"
        onChange={onFormChange}
      >
        <h1 className="text-7xl font-bold text-center text-slate-800 mb-10">
          Sign Up
        </h1>
        <label className="font-semibold" htmlFor="username">
          Username
        </label>
        <input
          className="border rounded-md border-zinc-200 py-2 px-3 text-gray-700 leading-tight"
          id="username"
          type="username"
          value={formData.username}
        ></input>
        <label className="font-semibold" htmlFor="email">
          Email
        </label>
        <input
          className="border rounded-md border-zinc-200 py-2 px-3 text-gray-700 leading-tight"
          id="email"
          type="email"
          value={formData.email}
        ></input>
        <label className="font-semibold" htmlFor="password">
          Password
        </label>
        <input
          className="border rounded-md border-zinc-200 py-2 px-3 text-gray-700 leading-tight"
          id="password"
          type="password"
          value={formData.password}
        ></input>
        <label className="font-semibold" htmlFor="passwordRepeat">
          Password Repeat
        </label>
        <input
          className="border rounded-md border-zinc-200 py-2 px-3 text-gray-700 leading-tight"
          id="passwordRepeat"
          type="password"
          value={formData.passwordRepeat}
        ></input>
        <button
          className="mt-10 bg-sky-500 hover:bg-sky-700 active:bg-sky-900 text-slate-50 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-slate-100 disabled:text-slate-300"
          disabled={isSignUpButtonDisabled()}
          onClick={submit}
        >
          Sign Up
        </button>{" "}
      </form>
    </div>
  );
}
