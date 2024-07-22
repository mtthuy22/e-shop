import React from "react";
import { useContext, useState, useEffect } from "react";
import Button from "./Button";
import { CartContext } from "./CartContext";

const CheckoutForm = ({ toComplete }) => {
  const [email, setEmail] = useState("");
  const [displayValidation, setDisplayValidation] = useState(false);
  let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  const [isError, setIsError] = useState(false);
  const cart = useContext(CartContext);
  const orderData = cart.cart.map(({ id, title, quantity }) => ({
    id,
    title,
    quantity,
  }));
  const FORMSPARK_FORM_URL = "https://submit-form.com/GxG2xLB2F";
  const isValid = emailRegex.test(email);

  function inputEmail(e) {
    let input = e.target.value;
    setEmail(input);
  }

  useEffect(() => {
    if (isValid) {
      setDisplayValidation(true);
    }
  }, [isValid]);

  async function handleSubmit(event) {
    event.preventDefault();
    setDisplayValidation(true);
    setIsError(false);
    if (isValid) {
      try {
        await fetch(FORMSPARK_FORM_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email,
            order: orderData,
          }),
        });
        toComplete();
      } catch (error) {
        console.log("error occured");
        setIsError(true);
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="email" className="form-label fw-semibold">
          Send order to:
        </label>
        <div className="row">
          <div className="col-sm-4 col-md-3">
            <input
              type="email"
              className={`form-control ${
                displayValidation
                  ? isValid
                    ? "is-valid"
                    : "is-invalid"
                  : "mb-2"
              }`}
              id="email"
              name="email"
              value={email}
              placeholder="name@example.com"
              onChange={inputEmail}
              required
            />
          </div>
        </div>

        {displayValidation ? (
          isValid ? (
            <div className="valid-feedback fw-bold text-start">Looks good!</div>
          ) : (
            <div className="invalid-feedback fw-bold text-start">
              Please enter a valid email.
            </div>
          )
        ) : (
          ""
        )}
        {isError && <p className="text-danger">Please check your connection</p>}

        <Button type="submit" btnVariant="btn-primary" text="Submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default CheckoutForm;
