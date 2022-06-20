import React from "react";

export default function SignUpPage() {
  return (
    <div>
      <h1>Sign Up</h1>
      <label htmlFor="username">Username</label>
      <input id="username"></input>
      <label htmlFor="email">Email</label>
      <input id="email" type="email"></input>
      <label htmlFor="password">Password</label>
      <input id="password" type="password"></input>
      <label htmlFor="passwordRepeat">Password Repeat</label>
      <input id="passwordRepeat" type="password"></input>
      <button disabled={true}>Sign Up</button>
    </div>
  );
}
