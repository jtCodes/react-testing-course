import React, { useEffect, useState } from "react";

export default function SignUpPage() {
  const [isSignUpButtonDisabled, setIsSignUpButtonDisabled] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  useEffect(() => {
    if (
      password.length > 0 &&
      passwordRepeat.length > 0 &&
      password === passwordRepeat
    ) {
      setIsSignUpButtonDisabled(false);
    }
  }, [password, passwordRepeat]);

  function onChangePassword(e) {
    setPassword(e.target.value);
  }

  function onChangePasswordRepeat(e) {
    setPasswordRepeat(e.target.value);
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <label htmlFor="username">Username</label>
      <input id="username"></input>
      <label htmlFor="email">Email</label>
      <input id="email" type="email"></input>

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={onChangePassword}
      ></input>
      <label htmlFor="passwordRepeat">Password Repeat</label>
      <input
        id="passwordRepeat"
        type="password"
        value={passwordRepeat}
        onChange={onChangePasswordRepeat}
      ></input>

      <button disabled={isSignUpButtonDisabled}>Sign Up</button>
    </div>
  );
}
