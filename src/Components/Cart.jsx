import React, { useState } from "react";
import "./Cart.css";
import CheckoutForm from "./CheckoutForm";
import Button from "./Button";

function Cart({
  cart,
  removeFromCart,
  orderComplete,
  setOrderComplete,
  resetCart,
}) {
  const [checkOut, setCheckOut] = useState(false);

  function toComplete() {
    setOrderComplete(true);
  }

  function toCheckOut() {
    setCheckOut(true);
  }

  function totalPrice() {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  }

  function resetShop() {
    setOrderComplete(false);
    setCheckOut(false);
    resetCart();
  }
  return (
    <>
      <div className="cart bg-secondary bg-opacity-75 text-white mb-5 py-4">
        <div className="container">
          {checkOut ? (
            <p className="text-center fw-semibold">
              {orderComplete
                ? "Your order has been completed."
                : "Your order summary"}
            </p>
          ) : (
            <p className="text-center">
              {cart.length ? "Currently in cart" : "Your cart is empty"}
            </p>
          )}
          <ul className="list-group">
            {cart.map((item) => (
              <li className="list-group-item" key={item.id}>
                <span>
                  {item.title} - {item.price} EUR
                </span>
                {!checkOut && (
                  <button
                    type="button"
                    onClick={() => removeFromCart(item)}
                    className="btn btn-danger btn-sm ms-3"
                  >
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ul>
          {cart.length > 0 && (
            <div className="text-start">
              <p className="text-uppercase fw-bold">
                <span>total</span>: {totalPrice()} EUR
              </p>
              {checkOut ? (
                !orderComplete && (
                  <CheckoutForm toComplete={toComplete}></CheckoutForm>
                )
              ) : (
                <Button
                  onClick={() => toCheckOut()}
                  btnColor="dark"
                  type="button"
                  text="Check-out"
                >
                  Check-out
                </Button>
              )}
            </div>
          )}
          {orderComplete && (
            <Button
              type="button"
              btnColor="primary"
              text="Go back to shop"
              onClick={() => resetShop()}
            ></Button>
          )}
        </div>
      </div>
    </>
  );
}
export default Cart;
