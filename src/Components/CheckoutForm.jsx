import React from "react";
import { useContext, useState, useEffect } from "react";
import Button from "./Button";
import { CartContext } from "./CartContext";

const CheckoutForm = ({ toComplete }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

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
            email: email,
            name: `${firstName} ${lastName}`,
            address: `${address1}, ${address2}, ${city}. ${zip}`,
            order: orderData,
          }),
        });
        toComplete();
      } catch (error) {
        console.log("error occured");
        setIsError(true);
      }
    }
    setFirstName("");
    setLastName("");
    setAddress1("");
    setAddress2("");
    setCity("");
    setZip("");
    setEmail("");
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <div className="row">
          <div className="row">
            <div className="col">
              <label for="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                aria-label="First name"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="col">
              <label for="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                aria-label="Last name"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-12">
            <label for="email" className="form-label">
              Email
            </label>
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
            {displayValidation ? (
              isValid ? (
                <div className="valid-feedback fw-bold text-start">
                  Looks good!
                </div>
              ) : (
                <div className="invalid-feedback fw-bold text-start">
                  Please enter a valid email.
                </div>
              )
            ) : (
              ""
            )}
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label for="inputAddress2" className="form-label">
              Address 2
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress2"
              placeholder="Apartment, studio, or floor"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label for="inputCity" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCity"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <label for="inputZip" className="form-label">
              Zip
            </label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </div>
        </div>

        {isError && <p className="text-danger">Please check your connection</p>}

        <Button type="submit" btnVariant="btn-primary" text="Submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default CheckoutForm;
