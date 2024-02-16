import React from "react";
import { useState } from "react";

function CheckoutForm({ toComplete }) {
  const [email, setEmail] = useState("");
  const [validEmail, setIsValidEmail] = useState("");
  const [displayValidation, setDisplayValidation] = useState(false);
  let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

  function inputEmail(e) {
    let input = e.target.value;
    setEmail(input);
    setIsValidEmail(emailRegex.test(input));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setDisplayValidation(true);
    validEmail && toComplete();
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} noValidate>
        <label htmlFor="email" className="form-label">
          Send order to:
        </label>
        <input
          type="email"
          className={`form-control w-25 ${
            displayValidation ? (validEmail ? "is-valid" : "is-invalid") : ""
          }`}
          id="email"
          value={email}
          placeholder="name@example.com"
          onChange={(e) => inputEmail(e)}
          required
        />

        {displayValidation ? (
          validEmail ? (
            <div className="valid-feedback fw-bold text-start">Looks good!</div>
          ) : (
            <div className="invalid-feedback fw-bold text-start">
              Please enter a valid email.
            </div>
          )
        ) : (
          ""
        )}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default CheckoutForm;
