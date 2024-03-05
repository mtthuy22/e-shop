import React from "react";

function Button({ text, btnColor, type, onClick, disabled = false }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`btn btn-${btnColor}`}
    >
      {text}
    </button>
  );
}

export default Button;
