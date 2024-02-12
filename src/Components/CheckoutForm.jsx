import React from "react";
import { useState } from "react";

function CheckoutForm({ toComplete }) {
  const [email, setEmail] = useState("");
  const [validEmail, setIsValidEmail] = useState(null);

  let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

  function checkEmail(e) {
    let input = e.target.value;
    setEmail(input);
    //console.log(emailRegex.test(input))
    setIsValidEmail(input === "" ? null : emailRegex.test(input));
  }

  function handleSubmit() {
    validEmail && toComplete();
  }

  return (
    <>
      <form onSubmit={() => handleSubmit()}>
        <label htmlFor="email" className="form-label">
          Send order to:
        </label>
        <input
          type="email"
          className={`form-control w-25 ${
            validEmail ? "is-valid" : validEmail === false ? "is-invalid" : ""
          }`}
          id="email"
          value={email}
          placeholder="name@example.com"
          onChange={(e) => checkEmail(e)}
          required
        />
        {validEmail ? (
          <div className="valid-feedback fw-bold text-start">Looks good!</div>
        ) : (
          <div className="invalid-feedback fw-bold text-start">
            Please enter a valid email.
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default CheckoutForm;
