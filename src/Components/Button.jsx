import React from "react";

function Button({ text, btnVariant, type, onClick, disabled = false }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`btn ${btnVariant}`}
    >
      {text}
    </button>
  );
}

export default Button;
