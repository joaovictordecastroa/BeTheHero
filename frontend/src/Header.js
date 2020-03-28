import React from "react";

/**
 * props.children retorna todo o HTML dentro do elemento
 */

export default function Header({ children }) {
  return (
    <header>
      <h1> {children} </h1>
    </header>
  );
}
