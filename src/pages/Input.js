import React from "react";

export default function Input({ id, type, label, value }) {
  return (
    <>
      <label className="font-medium" htmlFor={id}>
        {label}
      </label>
      <input
        className="border rounded-md border-zinc-100 shadow-inner py-2 px-3 
        text-gray-700 leading-tight hover:border-zinc-200"
        id={id}
        type={type}
        value={value}
      ></input>
    </>
  );
}
