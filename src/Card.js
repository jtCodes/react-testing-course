import React from "react";

export default function Card({ content, classNames }) {
  return (
    <div
      className={`p-10 border border-zinc-100 rounded-xl h-max shadow-md overflow-hidden ${classNames}`}
    >
      {content}
    </div>
  );
}
