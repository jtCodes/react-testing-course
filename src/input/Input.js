import React from "react";

export default function Input({ id, type, label, value, error, onChange }) {
  return (
    <>
      <label className="font-medium" htmlFor={id}>
        {label}
      </label>
      <input
        className={`border rounded-md shadow-inner py-2 px-3 text-gray-700 leading-tight ${
          error
            ? "border-red-500 hover:border-red-300 is-invalid"
            : "border-zinc-200 hover:border-zinc-300"
        }`}
        id={id}
        type={type || "text"}
        aria-describedby={id + "Help"}
        value={value}
        onChange={onChange}
      ></input>
      {error ? (
        <span className="invalid-feedback text-red-500 text-xs" id={id + "Help"}>
          {error}
        </span>
      ) : null}
    </>
  );
}
