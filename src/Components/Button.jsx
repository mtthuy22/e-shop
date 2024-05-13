import React from "react";

function Button({ text, btnVariant, type, onClick, disabled = false, addedClass}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`btn ${btnVariant} ${addedClass}`}
    >
      {text}
    </button>
  );
}

export default Button;