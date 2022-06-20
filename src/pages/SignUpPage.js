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
    <div>
      <form onChange={onFormChange}>
        <h1>Sign Up</h1>
        <label htmlFor="username">Username</label>
        <input id="username" type="username" value={formData.username}></input>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={formData.email}></input>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={formData.password}></input>
        <label htmlFor="passwordRepeat">Password Repeat</label>
        <input
          id="passwordRepeat"
          type="password"
          value={formData.passwordRepeat}
        ></input>
        <button disabled={isSignUpButtonDisabled()} onClick={submit}>
          Sign Up
        </button>{" "}
      </form>
    </div>
  );
}
